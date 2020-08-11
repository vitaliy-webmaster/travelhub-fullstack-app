const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const getAllPosts = async (req, res) => {
  const posts = await Post.find({}, '_id title text author');
  res.status(200).json(posts);
};

module.exports = { getAllPosts };
