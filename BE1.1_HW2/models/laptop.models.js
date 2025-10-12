const mongoose = require("mongoose");

const LaptopSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    processor: String,
    ramSizeGB: Number,
    storageSizeGB: Number,
    screenSizeInches: Number,
    isTouchscreen: {
        type: Boolean,
        default: false,
    },
    hasSSD: {
        type: Boolean,
        default: false,
    },
    isSaleActive: {
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

const Laptop = mongoose.model("Laptop", LaptopSchema);
module.exports = Laptop;