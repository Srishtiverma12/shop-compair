const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (name, email, phone, password, is_verified) VALUES ($1,$2,$3,$4,$5)',
      [name, email, phone || null, hashed, true]
    );

    res.status(201).json({ message: 'Account created successfully! Please login.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_pic: user.profile_pic,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Email not found.' });
    }

    res.json({ message: 'Please contact support to reset your password.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2',
      [hashed, email]
    );
    
    res.json({ message: 'Password reset successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

const verifyOTP = async (req, res) => {
  res.json({ message: 'Verified!' });
};

module.exports = { signup, verifyOTP, login, forgotPassword, resetPassword };