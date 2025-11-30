const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    // Model Referencing
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    // followers: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Follower",
    // }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

