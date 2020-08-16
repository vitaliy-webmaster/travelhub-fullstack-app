const mongoose = require('mongoose');
const passport = require('passport');

const createError = require('../helpers/createError');
const removeEmptyKeys = require('../helpers/removeEmptyKeys');

const User = mongoose.model('User');

const signUp = async (req, res, next) => {
  const { username, email, password, birthday, gender, bio, avatar } = req.body;
  const oldUserByUsername = await User.findOne({ username: username.trim() });
  if (oldUserByUsername) return next(createError('Username already exists'));
  const oldUserByEmail = await User.findOne({ email: email.trim() });
  if (oldUserByEmail) return next(createError('Email already exists'));
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
        return res.status(201).json(user);
      });
    })(req, res, next);
  });
};

const logIn = (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) return next(error);
    if (!user) {
      return next(createError('Invalid credentials', 401));
    }
    req.logIn(user, (error) => {
      if (error) return next(error);
      return res.status(200).json(user);
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

module.exports = { signUp, logIn, logOut, isAuthenticated };
