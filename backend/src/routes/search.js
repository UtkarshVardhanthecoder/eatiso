const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');

// Search meals
router.get('/', async (req, res) => {
  try {
    const { q, cuisine, location, minPrice, maxPrice } = req.query;
    let query = { isActive: true };
    if (q) query.$or = [{ name: { $regex: q, $options: 'i' } }, { description: { $regex: q, $options: 'i' } }, { cuisine: { $regex: q, $options: 'i' } }];
    if (cuisine) query.cuisine = cuisine;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (minPrice || maxPrice) query.price = { ...(minPrice && { $gte: Number(minPrice) }), ...(maxPrice && { $lte: Number(maxPrice) }) };
    
    const meals = await Meal.find(query).populate('host', 'name avatar').sort({ avgRating: -1 });
    res.json({ success: true, meals, count: meals.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;