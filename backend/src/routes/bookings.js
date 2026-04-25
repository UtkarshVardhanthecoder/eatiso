const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Meal = require('../models/Meal');
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

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { mealId, date, time, guests, totalAmount } = req.body;
    const booking = await Booking.create({ meal: mealId, user: req.userId, date, time, guests, totalAmount });
    await Meal.findByIdAndUpdate(mealId, { $inc: { totalBookings: 1 } });
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId }).populate('meal').sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get host's bookings
router.get('/host/bookings', auth, async (req, res) => {
  try {
    const meals = await Meal.find({ host: req.userId });
    const mealIds = meals.map(m => m._id);
    const bookings = await Booking.find({ meal: { $in: mealIds } }).populate('meal user', 'name email phone').sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update booking status
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate({ _id: req.params.id, user: req.userId }, { status: 'cancelled' }, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;