const mongoose = require('mongoose');

const emailStatusSchema = new mongoose.Schema({
  emailId: { type: String, unique: true },
  to: String,
  subject: String,
  body: String,
  provider: String,
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending',
  },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmailStatus', emailStatusSchema);
