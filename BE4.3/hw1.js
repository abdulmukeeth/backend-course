const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
const Restaurant = require("../BE2.1/models/restaurant.models");
initializeDatabase();

async function deleteRestaurant(restaurantId){
    try{
        const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
        return(deletedRestaurant);
    } catch(error){
        throw error;
    }
}

app.delete('/restaurants/:restaurantId', async(req, res) => {
    try{
        const deletedRestaurant = await deleteRestaurant(req.params.restaurantId);
        if(deletedRestaurant){
            res.status(200).json({message: "Restaurant Deleted Successfully."});
        } else {
            res.status(404).json({ error: "Restaurant not found." });
        }
    } catch(error){
        res.status(500).json({error: "Failed to Delete Restaurant."});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
})