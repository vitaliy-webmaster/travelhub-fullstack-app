const mongoose = require('mongoose');
const passport = require('passport');

const createError = require('../helpers/createError');

const User = mongoose.model('User');

const signUp = (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email });
  User.register(user, password, (error, user) => {
    if (error) return next(error);
    return res.status(201).json(user);
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
