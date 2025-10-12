const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    title: String,
    specification: String,
    itemImgUrl: String,
    itemPrice: Number,
    isFreeDelivery: Boolean,
    stockPcs: Number,
    overallRating: Number,
    noOfRatings: Number,
    noOfReviews: Number,
    warantyYears: Number,
    wishlist: Boolean,
});

const Item = mongoose.model("Item", ItemSchema );

module.exports = Item;