const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'eatiso-secret-key';

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token' });
    req.userId = jwt.verify(token, JWT_SECRET).id;
    next();
  } catch { res.status(401).json({ success: false, message: 'Invalid token' }); }
};

// Create payment order (Razorpay placeholder)
router.post('/create-order', auth, async (req, res) => {
  try {
    const { bookingId, amount } = req.body;
    // In production, use Razorpay API here
    const order = { id: 'order_' + Date.now(), amount, currency: 'INR', status: 'created' };
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify payment
router.post('/verify', auth, async (req, res) => {
  try {
    const { bookingId, paymentId } = req.body;
    await Booking.findByIdAndUpdate(bookingId, { paymentId, paymentStatus: 'paid', status: 'confirmed' });
    res.json({ success: true, message: 'Payment verified' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;