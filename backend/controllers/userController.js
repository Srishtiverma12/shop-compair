const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, profile_pic, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile.', error: err.message });
  }
};

const updateProfile = async (req, res) => {
  const { name, phone } = req.body;
  
  try {
    await pool.query(
      'UPDATE users SET name = $1, phone = $2 WHERE id = $3',
      [name, phone, req.user.id]
    );
    res.json({ message: 'Profile updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile.', error: err.message });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  
  try {
    const result = await pool.query(
      'SELECT password FROM users WHERE id = $1',
      [req.user.id]
    );
    
    const match = await bcrypt.compare(oldPassword, result.rows[0].password);
    if (!match) {
      return res.status(401).json({ message: 'Old password is incorrect.' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashed, req.user.id]
    );
    
    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error changing password.', error: err.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    await pool.query('DELETE FROM wishlist WHERE user_id = $1', [req.user.id]);
    await pool.query('DELETE FROM comparisons WHERE user_id = $1', [req.user.id]);
    await pool.query('DELETE FROM users WHERE id = $1', [req.user.id]);
    res.json({ message: 'Account deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting account.', error: err.message });
  }
};

module.exports = { getProfile, updateProfile, changePassword, deleteAccount };