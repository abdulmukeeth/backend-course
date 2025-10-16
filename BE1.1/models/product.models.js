const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: String,
    productImgUrl: String,
    productPrice: Number,
    warrantyInfo: String,
    isFlipkartAssured: Boolean,
    rating: {
    type: Number,
    default: 1,
    min: 1,
    max: 5,
    },
    noOfRatings: Number,
    noOfReviews: Number,
    variant: {
        type: String,
        enum: [
           '2023 Model - 1 Ton 3 Star', '2023 Model - 1.5 Ton 3 Star',  
        ],
    },
    hasWifiConnectivity: Boolean,
    isSpecialPrice: Boolean,
    availableOffers: {
        type: String,
        enum: [
            'Bank Offer 5% Cashback on Flipkart Axis Bank Card',
            'Bank Offer Flat ₹1,250 off on HDFC Bank Credit CArd EMI Txns on 6 and 9 months tenure, Min. Txn Value: ₹15,000',
            'Bank Offer Flat ₹1,500 off on HDFC Bank Credit CArd EMI Txns on 12 tenure, Min. Txn Value: ₹15,000',
            'Special Price Get extra 4% off (price inclusive of cashback/coupon)'
        ],
    },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;