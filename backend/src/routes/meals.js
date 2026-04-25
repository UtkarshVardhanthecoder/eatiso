const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'eatiso-secret-key';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token' });
    req.userId = jwt.verify(token, JWT_SECRET).id;
    next();
  } catch { res.status(401).json({ success: false, message: 'Invalid token' }); }
};

// Get all meals
router.get('/', async (req, res) => {
  try {
    const { cuisine, minPrice, maxPrice, location, search } = req.query;
    let query = { isActive: true };
    if (cuisine) query.cuisine = cuisine;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (minPrice || maxPrice) query.price = { ...(minPrice && { $gte: minPrice }), ...(maxPrice && { $lte: maxPrice }) };
    if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    
    const meals = await Meal.find(query).populate('host', 'name avatar avgRating').sort({ createdAt: -1 });
    res.json({ success: true, meals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single meal
router.get('/:id', async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate('host', 'name avatar bio isVerified avgRating');
    if (!meal) return res.status(404).json({ success: false, message: 'Meal not found' });
    res.json({ success: true, meal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create meal (host only)
router.post('/', auth, async (req, res) => {
  try {
    const meal = await Meal.create({ ...req.body, host: req.userId });
    res.json({ success: true, meal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update meal
router.put('/:id', auth, async (req, res) => {
  try {
    const meal = await Meal.findOneAndUpdate({ _id: req.params.id, host: req.userId }, req.body, { new: true });
    if (!meal) return res.status(404).json({ success: false, message: 'Meal not found' });
    res.json({ success: true, meal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete meal
router.delete('/:id', auth, async (req, res) => {
  try {
    const meal = await Meal.findOneAndDelete({ _id: req.params.id, host: req.userId });
    if (!meal) return res.status(404).json({ success: false, message: 'Meal not found' });
    res.json({ success: true, message: 'Meal deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;