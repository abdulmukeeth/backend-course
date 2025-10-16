const mongoose = require("mongoose");

const StaySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    location: String,
    pricePerNight: String,
    capacity: Number,
    isPetFriendly: {
        type: Boolean,
        default: false,
    },
    hasWifi: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},{
    timestamps: true,
});

const Stay = mongoose.model("Stay",StaySchema);
module.exports = Stay;