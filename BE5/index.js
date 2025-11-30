// Model Referencing 
const { initializeDatabase } = require("../db/db.connect");
const Post = require("./models/post.model");
const User = require("./models/user.model");
initializeDatabase();

const userData = {
    name: "John",
    email: "john@gmail.com",
};

const addUser = async () => {
    try{
        const newUser = new User(userData);
        await newUser.save();
    } catch(error){
        console.log("Error: ", error);
    }
};

// addUser();

const postData = {
    title: "Greeting",
    content: "Have a great",
    author: "6921c4ee7846a22825456596",
}
const addPost = async () => {
    try{
        const newPost = new Post(postData);
        await newPost.save();
        console.log("Post Added Successfully.");
    } catch(error){
        console.log("Error", error);
    }
};

// addPost();

const getAllPosts = async () => {
    try{
        // const allPosts = await Post.find();
        // Populate property used to get complete referenced data 
        const allPosts = await Post.find().populate("author");
        console.log("All Posts: ", allPosts);
    } catch(error){
        console.log("Error", error);
    }
}

getAllPosts();