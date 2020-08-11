const mongoose = require('mongoose');

const createError = require('../helpers/createError');

const User = mongoose.model('User');

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
};

const getAuthUser = async (req, res) => {
  if (!req.user._id) return next(createError('Not authenticated', 401));
  return res.status(200).json(req.user);
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return next(createError('User not found', 404));
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  if (!userId || req.user._id.toString() !== userId)
    return next(createError('Not authorized', 403));
  try {
    const updUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updUser);
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  if (!userId || req.user._id.toString() !== userId)
    return next(createError('Not authorized', 403));
  try {
    const delUser = await User.findByIdAndDelete(req.user._id);
    return res.status(200).json({ _id: delUser._id });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllUsers, getAuthUser, getUser, updateUser, deleteUser };
