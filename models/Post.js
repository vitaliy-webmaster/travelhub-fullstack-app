const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
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
  { timestamps: true, versionKey: false }
);

class PostClass {
  static async paginate(
    query = {},
    { skip, limit, sortBy = 'createdAt', populate } = {}
  ) {
    let chain = this.find(query).sort({ [sortBy]: -1 });
    if (populate != undefined) chain.populate(populate);
    if (skip != undefined) chain.skip(parseInt(skip));
    if (limit != undefined) chain.limit(parseInt(limit));
    return chain;
  }
}

postSchema.loadClass(PostClass);

module.exports = mongoose.model('Post', postSchema);
