const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    bodyStyle: String,
    fuelType: String,
    transmission: String,
    engine: String,
    mileage: Number,
    color: String,
    price: Number,
    condition: {
        type: String,
        enum: ["Used", "New"],
    },
    description: String,
    photos: [{
    type: String,
    }],
})  

const Car = mongoose.model("Cars", CarSchema);
module.exports = Car;