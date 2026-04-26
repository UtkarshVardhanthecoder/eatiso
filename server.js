require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (mongoUri && mongoUri.includes('mongodb')) {
      await mongoose.connect(mongoUri);
      console.log('MongoDB Connected');
    } else {
      console.log('Running without MongoDB');
    }
  } catch (error) {
    console.log('MongoDB error:', error.message);
  }
};

connectDB();

app.use('/api/auth', require('./src/src/routes/auth'));
app.use('/api/meals', require('./src/src/routes/meals'));
app.use('/api/bookings', require('./src/src/routes/bookings'));
app.use('/api/reviews', require('./src/src/routes/reviews'));
app.use('/api/payments', require('./src/src/routes/payments'));
app.use('/api/search', require('./src/src/routes/search'));

app.get('/health', (req, res) => res.json({ status: 'OK' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port', PORT));
