const express = require('express');
const router = express.Router();
const {
  compareProduct,
  getHistory,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/compare', compareProduct);
router.get('/history', verifyToken, getHistory);
router.post('/wishlist', verifyToken, addToWishlist);
router.get('/wishlist', verifyToken, getWishlist);
router.delete('/wishlist/:id', verifyToken, removeFromWishlist);

module.exports = router;