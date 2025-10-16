const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    foodTitle: String,
    foodDescription: String,
    isFavourite: Boolean,
    calories: Number,
    carbohydrates: Number,
    protein: Number,
    fatUnsaturated: Number,
    foodImageUrl: String,
});

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;