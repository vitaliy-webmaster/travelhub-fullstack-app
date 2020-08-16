const mongoose = require('mongoose');
const multer = require('multer');

const createError = require('../helpers/createError');
const removeEmptyKeys = require('../helpers/removeEmptyKeys');

const Post = mongoose.model('Post');

const getAllPosts = async (req, res, next) => {
  const { skip, limit, sortBy } = req.query;
  try {
    const posts = await Post.paginate(
      {},
      { skip, limit, sortBy, populate: 'likedBy author' }
    );
    const total = await Post.countDocuments({});
    return res.status(200).json({ total, posts });
  } catch (error) {
    return next(error);
  }
};

const getPostsByTags = async (req, res, next) => {
  const { tags } = req.body;
  const { skip, limit, sortBy } = req.query;
  try {
    if (tags && tags.length > 0) {
      const posts = await Post.paginate(
        { tags: { $in: tags } },
        { skip, limit, sortBy, populate: 'likedBy author' }
      );
      const total = await Post.countDocuments({ tags: { $in: tags } });
      return res.status(200).json({ total, posts });
    } else {
      return next(createError('Invalid input data: tags', 400));
    }
  } catch (error) {
    return next(error);
  }
};

const getAuthUserPosts = async (req, res, next) => {
  const { skip, limit, sortBy } = req.query;
  if (!req.user._id) return next(createError('Not authenticated', 401));
  try {
    const posts = await Post.paginate(
      { author: req.user._id },
      { skip, limit, sortBy, populate: 'likedBy author' }
    );
    const total = await Post.countDocuments({ author: req.user._id });
    return res.status(200).json({ total, posts });
  } catch (error) {
    return next(error);
  }
};

const getPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate('likedBy author');
    if (!post) return next(createError('Post not found', 404));
    return res.status(200).json(post);
  } catch (error) {
    return next(error);
  }
};

const addPost = async (req, res, next) => {
  if (!req.user._id) return next(createError('Not authenticated', 401));
  const { title, text, image, tags = [] } = req.body;
  if (!text || !title)
    return next(createError('Mandatory fields: Title, Text', 401));
  try {
    const post = new Post({ title, text, image, author: req.user._id, tags });
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    return next(error);
  }
};

const multerPostPreviewConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/server/uploads/post-preview/');
    },
    filename: (req, file, cb) => {
      const nameData = file.originalname.split('.');
      const ext = nameData[nameData.length - 1];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
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

const multerPostPreview = multer(multerPostPreviewConfig).single(
  'post-preview'
);

const uploadPostPreview = (req, res, next) => {
  if (!req.file) return next(createError('Image type not supported', 400));
  return res.status(200).json({ filename: req.file.filename });
};

const updatePost = async (req, res, next) => {
  const { postId } = req.params;
  const { title, text, image, tags } = req.body;
  if (!text || !title)
    return next(createError('Mandatory fields: Title, Text', 400));
  try {
    const post = await Post.findById(postId);
    if (!post || req.user._id.toString() !== post.author.toString())
      return next(createError('Not authorized', 403));
    const updPost = await Post.findByIdAndUpdate(
      postId,
      { $set: removeEmptyKeys({ title, text, image, tags }) },
      { new: true }
    ).populate('likedBy author');
    return res.status(200).json(updPost);
  } catch (error) {
    return next(error);
  }
};

const deletePost = async (req, res, next) => {
  if (!req.user._id) return next(createError('Not authenticated', 401));
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post || req.user._id.toString() !== post.author.toString())
      return next(createError('Not authorized', 403));
    const delPost = await Post.findByIdAndDelete(postId);
    return res.status(200).json({ _id: delPost._id });
  } catch (error) {
    return next(error);
  }
};

const likePost = async (req, res, next) => {
  if (!req.user._id) return next(createError('Not authenticated', 401));
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) return next(createError('Post not found', 404));
    const isLikedAlready =
      post.likedBy.findIndex(
        (item) => item.toString() === req.user._id.toString()
      ) > -1;
    if (!isLikedAlready) {
      post.likedBy.push(req.user._id);
      await post.save();
    }
    await Post.populate(post, { path: 'likedBy author' });
    return res.status(200).json(post);
  } catch (error) {
    return next(error);
  }
};

const unlikePost = async (req, res, next) => {
  if (!req.user._id) return next(createError('Not authenticated', 401));
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) return next(createError('Post not found', 404));
    const isLikedAlready =
      post.likedBy.findIndex(
        (item) => item.toString() === req.user._id.toString()
      ) > -1;
    if (isLikedAlready) {
      post.likedBy.pull(req.user._id.toString());
      await post.save();
    }
    await Post.populate(post, { path: 'likedBy author' });
    return res.status(200).json(post);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostsByTags,
  getAuthUserPosts,
  getPost,
  addPost,
  multerPostPreview,
  uploadPostPreview,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
};
