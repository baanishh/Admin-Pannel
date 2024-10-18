const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'publisher', 'moderator'], default: 'publisher' },
  status: { type: String, enum: ['active', 'suspend', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  photo: { type: String } // New field for storing the photo file path
});

module.exports = mongoose.model('User', userSchema);
