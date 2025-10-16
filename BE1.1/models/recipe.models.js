const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
  recipeCaption: {
    type: String,
  },
  noOfServings: {
    type: Number,
  },
  preppingTime: {
    type: String,
  },
  cookingTime: {
    type: String,
  },
  ingredients: [
    {
      type: String,
    },
  ],
  directions: [
    {
      type: String,
    },
  ],
  notes: {
    type: String,
  },
}, { timestamps: true });

const Recipe = mongoose.model("Recipe",RecipeSchema);

module.exports = Recipe;
