const mongoose = require('mongoose');

const StudySessionSchema = new mongoose.Schema({
  user: { type: String, required: true },
  subject: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudySession', StudySessionSchema);
