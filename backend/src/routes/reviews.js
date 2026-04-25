const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
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

// Create review
router.post('/', auth, async (req, res) => {
  try {
    const { mealId, rating, comment, bookingId } = req.body;
    const review = await Review.create({ meal: mealId, user: req.userId, rating, comment, bookingId });
    
    // Update meal rating
    const reviews = await Review.find({ meal: mealId });
    const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
    await Meal.findByIdAndUpdate(mealId, { avgRating: avg.toFixed(1), totalRatings: reviews.length });
    
    res.json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get meal reviews
router.get('/meal/:mealId', async (req, res) => {
  try {
    const reviews = await Review.find({ meal: req.params.mealId }).populate('user', 'name avatar').sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;