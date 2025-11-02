const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
const Restaurant = require("../BE1.1/models/restaurant.models");
initializeDatabase();
// 1. Create an API with route "/restaurants" to read all restaurants from the Database. Test your API with Postman.
async function readAllRestaurants(){
    try{
        const restaurants = await Restaurant.find();
        return(restaurants);
    } catch(error){
        throw(error);
    }
}
app.get("/restaurants", async (req, res) => {
    try{
        const restaurants = await readAllRestaurants();
        if(restaurants.length != 0){
            res.send(restaurants);
        } else {
            res.status(404).json({error: "Restaurant Not Found"});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Restaurant Data"})
    }
})
// 2. Create an API with route "/restaurants/:restaurantName" to read a restaurant by its name. Test your API with Postman.
async function readRestaurantByName(restaurantName){
    try{
        const restaurant = await Restaurant.findOne({name: restaurantName});
        return(restaurant);
    } catch(error){
        throw(error);
    }
}
app.get("/restaurants/:restaurantName", async(req, res) => {
    try{    
        const restaurant = await readRestaurantByName(req.params.restaurantName);
        if(restaurant.length != 0){
            res.send(restaurant);
        } else {
            res.status(404).json({error: "Restaurant Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Restaurant Data"})
    }
})
// 3. Create an API with route "/restaurants/directory/:phoneNumber" to read a restaurant by phone number. Test your API with Postman.
async function readRestaurantByPhoneNumber(restaurantPhoneNumber){
    try{
        const restaurant = await Restaurant.findOne({phoneNumber: restaurantPhoneNumber});
        return(restaurant);
    } catch(error){
        throw(error);
    }
}
app.get("/restaurants/directory/:phoneNumber", async(req, res) => {
    try{
        const restaurant = await readRestaurantByPhoneNumber(req.params.phoneNumber);
        if(restaurant.length != 0){
            res.send(restaurant);
        } else {
            res.status(404).json({error: "Restaurant Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Restaurant Data"})
    }
})
// 4. Create an API with route "/restaurants/cuisine/:cuisineName" to read all restaurants by cuisine. Test your API with Postman.
async function readRestaurantByCuisine(cuisineName){
    try{
        const restaurant = await Restaurant.find({cuisine: cuisineName});
        return(restaurant);
    } catch(error){
        throw(error);
    }
}
app.get("/restaurants/cuisine/:cuisineName", async(req, res) => {
    try{
        const restaurant = await readRestaurantByCuisine(req.params.cuisineName);
        if(restaurant.length != 0){
            res.send(restaurant);
        } else {
            res.status(404).json({error: "Restaurant Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Restaurant Data"})
    }
})
// 5. Create an API with route "/restaurants/location/:restaurantLocation" to read all restaurants by location. Test your API with Postman.
async function readRestaurantByLocation(restaurantLocation){
    try{
        const restaurant = await Restaurant.find({location: restaurantLocation});
        return(restaurant);
    } catch(error){
        throw(error);
    }
}
app.get("/restaurants/location/:restaurantLocation", async(req, res) => {
    try{
        const restaurant = await readRestaurantByLocation(req.params.restaurantLocation);
        if(restaurant.length != 0){
            res.send(restaurant);
        } else {
            res.status(404).json({error: "Restaurant Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Restaurant Data"})
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Running on ", PORT);
})