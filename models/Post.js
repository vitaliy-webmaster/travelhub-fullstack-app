const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 256,
      required: 'Post title is required',
    },
    text: {
      type: String,
      trim: true,
      required: 'Post text is required',
    },
    image: {
      type: String,
      // required: 'Post image is required',
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    likedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    tags: { type: [String], index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
