const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    cardNumber: Number,
    validityDate: Date,
    fullName: String,
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;