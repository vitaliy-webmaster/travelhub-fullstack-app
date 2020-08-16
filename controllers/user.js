const mongoose = require('mongoose');
const multer = require('multer');

const User = mongoose.model('User');
const createError = require('../helpers/createError');
const removeEmptyKeys = require('../helpers/removeEmptyKeys');

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
};

const getAuthUser = async (req, res, next) => {
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

const multerAvatarConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/server/uploads/avatar/');
    },
    filename: (req, file, cb) => {
      const nameData = file.originalname.split('.');
      const ext = nameData[nameData.length - 1];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: (req, file, next) => {
    if (
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png'
    ) {
      next(null, true);
    } else {
      next(null, false);
    }
  },
};

const multerAvatar = multer(multerAvatarConfig).single('avatar');

const uploadAvatar = (req, res, next) => {
  if (!req.file) return next(createError('Image type not supported', 400));
  return res.status(200).json({ filename: req.file.filename });
};

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { birthday, gender, bio, avatar } = req.body;
  if (!userId || req.user._id.toString() !== userId)
    return next(createError('Not authorized', 403));
  try {
    const updUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: removeEmptyKeys({ birthday, gender, bio, avatar }) },
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

module.exports = {
  getAllUsers,
  getAuthUser,
  getUser,
  multerAvatar,
  uploadAvatar,
  updateUser,
  deleteUser,
};
