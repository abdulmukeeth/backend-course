const mongoose = require("mongoose");
// Mongoose is the library that helps us query from the mongo db database 
const CarSchema = new mongoose.Schema({
    model: String,
    releaseYear: Number,
    make: String
});

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;