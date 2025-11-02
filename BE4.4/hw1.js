const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
const Restaurant = require("../BE2.1/models/restaurant.models");
initializeDatabase();

async function updateRestaurant(restaurantId, dataToUpdate){
    try{
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, dataToUpdate, {new: true,});
        return(updatedRestaurant);
    } catch(error){
        throw error;
    }
}

app.post("/restaurants/:restaurantId", async(req, res) => {
    try{
        const updatedRestaurant = await updateRestaurant(req.params.restaurantId, req.body);
        if(updatedRestaurant){
            res.status(200).json({message: "Restaurant Updated Successfully.", updatedRestaurantRecord: updatedRestaurant,});
        } else {    
            res.status(404).json({error: "Restaurant Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Update Restaurant."});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Running on ", PORT);
})