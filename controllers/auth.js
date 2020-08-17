const mongoose = require('mongoose');
const passport = require('passport');

const createError = require('../helpers/createError');
const removeEmptyKeys = require('../helpers/removeEmptyKeys');

const User = mongoose.model('User');

const signUp = async (req, res, next) => {
  const { username, email, password, birthday, gender, bio, avatar } = req.body;
  const oldUserByUsername = await User.findOne({ username: username.trim() });
  if (oldUserByUsername)
    return next(createError('Username already exists', 400));
  const oldUserByEmail = await User.findOne({ email: email.trim() });
  if (oldUserByEmail) return next(createError('Email already exists', 400));
  const newUser = new User(
    removeEmptyKeys({ username, email, birthday, gender, bio, avatar })
  );
  User.register(newUser, password, (error, user) => {
    if (error) return next(error);
    passport.authenticate('local', (error, user, info) => {
      if (error) return next(error);
      if (!user) {
        return next(createError('Server Error', 500));
      }
      req.logIn(user, (error) => {
        if (error) return next(error);
        const userObj = user.toObject();
        delete userObj.hash;
        delete userObj.salt;
        return res.status(201).json(userObj);
      });
    })(req, res, next);
  });
};

const validateUsername = async (req, res, next) => {
  const { username } = req.params;
  if (username) {
    const oldUserByUsername = await User.findOne({ username: username.trim() });
    if (oldUserByUsername)
      return next(createError('Username already exists', 400));
    return res.status(200).json(username.trim());
  } else {
    return res.status(200).json('');
  }
};

const logIn = (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) return next(error);
    if (!user) {
      return next(createError('Invalid credentials', 401));
    }
    req.logIn(user, (error) => {
      if (error) return next(error);
      const userObj = user.toObject();
      delete userObj.hash;
      delete userObj.salt;
      return res.status(200).json(userObj);
    });
  })(req, res, next);
};

const logOut = async (req, res, next) => {
  req.logout();
  res.status(200).json('Successfully logged out');
};

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated())
    return next(createError('Not authenticated', 401));
  return next();
};

module.exports = { signUp, validateUsername, logIn, logOut, isAuthenticated };
