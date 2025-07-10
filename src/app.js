const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const rateLimiter = require('./middleware/rateLimiter');
const EmailService = require('./services/EmailService');

dotenv.config();

const app = express();
app.use(express.json());

// Rate-limited POST endpoint to send emails
app.post('/send', rateLimiter, async (req, res) => {
  const { to, subject, body } = req.body;

  try {
    const result = await EmailService.send({ to, subject, body });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Connect to MongoDB
const isTest = process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID;
const dbURI = isTest
  ? 'mongodb://localhost:27017/email_service_test'
  : process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

module.exports = app;
