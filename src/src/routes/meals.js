const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'eatiso-secret-key';

const DEMO_MEALS = [
  { id: '1', name: 'Traditional Punjabi Thali', host: { name: 'Priya Sharma', avgRating: 4.8 }, cuisine: 'North Indian', price: 450, rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', location: 'Mumbai', description: 'Authentic Punjabi meals with fresh ingredients', isVerified: true },
  { id: '2', name: 'Authentic Biryani Feast', host: { name: 'Ahmed Khan', avgRating: 4.9 }, cuisine: 'Mughlai', price: 550, rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', location: 'Hyderabad', description: 'Special hyderabadi biryani', isVerified: true },
  { id: '3', name: 'South Indian Sambar Meal', host: { name: 'Lakshmi Reddy', avgRating: 4.7 }, cuisine: 'South Indian', price: 380, rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', location: 'Chennai', description: 'Traditional South Indian home food', isVerified: true },
  { id: '4', name: 'Rajasthani Dal Baati', host: { name: 'Ramesh Singh', avgRating: 4.6 }, cuisine: 'Rajasthani', price: 420, rating: 4.6, reviews: 78, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400', location: 'Jaipur', description: 'Authentic Rajasthani dal baati', isVerified: true },
  { id: '5', name: 'Gujarati Thali', host: { name: 'Meera Patel', avgRating: 4.8 }, cuisine: 'Gujarati', price: 350, rating: 4.8, reviews: 92, image: 'https://images.unsplash.com/photo-161舉1594648017-bc3c8a17fca0?w=400', location: 'Ahmedabad', description: 'Home-made Gujarati dishes', isVerified: true },
];

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
    
    const meals = await Meal.find(query).populate('host', 'name avatar avgRating').sort({ createdAt: -1 }).catch(() => null);
    if (!meals) return res.json({ success: true, meals: DEMO_MEALS });
    res.json({ success: true, meals });
  } catch (error) {
    res.json({ success: true, meals: DEMO_MEALS });
  }
});

// Get single meal
router.get('/:id', async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate('host', 'name avatar bio isVerified avgRating').catch(() => null);
    if (!meal) {
      const demo = DEMO_MEALS.find(m => m.id === req.params.id);
      return demo ? res.json({ success: true, meal: demo }) : res.status(404).json({ success: false, message: 'Meal not found' });
    }
    res.json({ success: true, meal });
  } catch (error) {
    const demo = DEMO_MEALS.find(m => m.id === req.params.id);
    res.json({ success: true, meal: demo || null });
  }
});
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