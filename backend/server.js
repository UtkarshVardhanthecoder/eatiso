require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eatiso');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

connectDB();

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/meals', require('./src/routes/meals'));
app.use('/api/bookings', require('./src/routes/bookings'));
app.use('/api/reviews', require('./src/routes/reviews'));
app.use('/api/payments', require('./src/routes/payments'));
app.use('/api/search', require('./src/routes/search'));

app.get('/health', (req, res) => res.json({ status: 'OK', timestamp: new Date().toISOString() }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Eatiso API running on port ${PORT}`));

module.exports = app;