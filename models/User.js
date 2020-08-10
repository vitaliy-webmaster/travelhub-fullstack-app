const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const usernameRegexp = /^[a-zA-Z0-9]+$/;
const emailRegexp = /^\S+@\S+\.\S+$/;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      match: [usernameRegexp, 'is invalid username'],
      minlength: 3,
      maxlength: 10,
      required: 'Username is required',
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: [emailRegexp, 'is invalid email'],
      required: 'Email is required',
      index: true,
    },
    birthday: {
      type: Date,
      min: '1900-01-01',
      max: Date.now(),
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    bio: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: '/static/img/avatar.jpg',
    },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);
