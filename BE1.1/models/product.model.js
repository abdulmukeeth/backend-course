const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productTitle: String,
    productCategory: String,
    productInfo: String,
    colors: [
      {
        type: String,
      },
    ],
    size: [
        {
            type: Number,
            required: true,
        }
    ],
    productPrice: Number,
    productImageUrl: String,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;