const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      minlength: 8,
      select: false
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'sales_executive'],
      default: 'admin',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
