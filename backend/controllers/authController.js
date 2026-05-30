const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../utils/emailService');
require('dotenv').config();

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

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
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await pool.query(
      'INSERT INTO users (name, email, phone, password, otp, otp_expires) VALUES ($1,$2,$3,$4,$5,$6)',
      [name, email, phone || null, hashed, otp, otpExpires]
    );

    await sendOTPEmail(email, otp);
    res.status(201).json({ message: 'Account created! Please check your email for OTP.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = result.rows[0];
    
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }
    
    if (new Date() > new Date(user.otp_expires)) {
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }

    await pool.query(
      'UPDATE users SET is_verified = TRUE, otp = NULL, otp_expires = NULL WHERE email = $1',
      [email]
    );
    
    res.json({ message: 'Email verified successfully! You can now login.' });
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
    
    if (!user.is_verified) {
      return res.status(403).json({ message: 'Please verify your email first.' });
    }

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

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    
    await pool.query(
      'UPDATE users SET otp = $1, otp_expires = $2 WHERE email = $3',
      [otp, otpExpires, email]
    );
    
    await sendOTPEmail(email, otp);
    res.json({ message: 'OTP sent to your email.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = result.rows[0];
    
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }
    
    if (new Date() > new Date(user.otp_expires)) {
      return res.status(400).json({ message: 'OTP expired.' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query(
      'UPDATE users SET password = $1, otp = NULL, otp_expires = NULL WHERE email = $2',
      [hashed, email]
    );
    
    res.json({ message: 'Password reset successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

module.exports = { signup, verifyOTP, login, forgotPassword, resetPassword };