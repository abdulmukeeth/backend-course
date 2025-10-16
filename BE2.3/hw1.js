const { initializeDatabase } = require("../db/db.connect");
const Restaurant = require("../BE2.1/models/restaurant.models");
initializeDatabase();

// 1. Create a function that accepts a restaurant ID and an object with updated data, and updates the restaurant with the provided ID. Take the _id of the restaurant which has the name Yo China and update its rating from 3.9 to 4.1. Console the updated restaurant.
// ID : "68ee8c37051f9ad67f7c28e6"
async function updateRestaurantById(restaurantId, dataToUpdate){
    try{
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, dataToUpdate, {new : true});
        console.log("Ex1: ", updatedRestaurant);
    } catch(error){
        console.log("error Updating the Data", error);
    }
}
const restaurantID = "68ee8c37051f9ad67f7c28e6";
updateRestaurantById(restaurantID, {rating: 4.1});

// 2. Create a function that accepts a restaurant name and an object with updated data, and updates the restaurant. Take the restaurant which has the name "Somi" and update its name from "Somi" to "Som Sarovar". Console the updated restaurant.
async function updateRestaurantByName(restaurantName, dataToUpdate){
    try{
        const updatedRestaurant = await Restaurant.findOneAndUpdate({name: restaurantName}, dataToUpdate, {new: true});
        console.log("Ex2: ",updatedRestaurant);
    } catch(error){
        console.log("Error updating the data", error);
    }
}
updateRestaurantByName("Somi", {name: "Som Sarovar"});

// 3. Create a function that accepts a restaurant's phone number and an object with updated data, and updates the restaurant. Take the restaurant which has the phone number "+1288997392" and update isDeliveryAvailable option to true. Console the updated restaurant.
async function updateRestaurantByPhoneNo(restaurantPhoneNo, dataToUpdate){
    try{
        const updatedRestaurant = await Restaurant.findOneAndUpdate({phoneNumber: restaurantPhoneNo}, dataToUpdate, {new: true});
        console.log("Ex3: ", updatedRestaurant);
    } catch(error){
        console.log("Error updating the data", error);
    }
}
updateRestaurantByPhoneNo("+1288997392", {isDeliveryAvailable: true});