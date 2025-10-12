const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userProfileImageUrl: {
    type: String,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  caption: {
    type: String,
    required: true,
  },
  mentions: [
    {
      type: String,
    },
  ],
  hashtags: [
    {
      type: String,
    },
  ],
  postImageUrl: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
