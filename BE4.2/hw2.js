const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
const Hotel = require("../BE2.1/models/hotel.models");
initializeDatabase();

// 1. Create an API with route "/hotels" to create a new hotel data in the Database. Test your API with Postman.
async function createHotel(newHotel){
    try{
        const hotel = new Hotel(newHotel);
        const saveHotel = await hotel.save();
        return(saveHotel);
    } catch (error){
        throw error;
    }
};
app.post("/hotels", async(req, res) => {
    try{
        const hotelToAdd = await createHotel(req.body);
        res.status(201).json({message: "Hotel Added Successfully.", hotelAdded: hotelToAdd});
    } catch(error){
        res.status(500).json({error: error.message})
        // res.status(500).json({error: "Failed to Add Hotel."})
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Running on ", PORT);
})