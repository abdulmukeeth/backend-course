const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
const Restaurant = require("../BE2.1/models/restaurant.models");
initializeDatabase();

// 1. Create an API with route "/restaurants" to create a new restaurant data in the Database. Test your API with Postman.
async function createRestaurant(newRestaurant){
    try{
        console.log(newRestaurant);
        const restaurant = new Restaurant(newRestaurant);
        const saveRestaurant = await restaurant.save();
        return(saveRestaurant);
    } catch(error){
        throw error;
    }
};
app.post("/restaurants", async(req, res) => {
    try{
        const restaurantToAdd = await createRestaurant(req.body);
        res.status(201).json({message: "Restaurant Added Successfully.", restaurantAdded: restaurantToAdd});
    } catch(error){
        res.status(500).json({error: error.message})
        // res.status(500).json({error: "Failed to Add Restaurant."})
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Running on ", PORT);
})