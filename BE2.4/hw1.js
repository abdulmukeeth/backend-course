const { initializeDatabase } = require("../db/db.connect");
const Restaurant = require("../BE2.1/models/restaurant.models");
initializeDatabase();

// 1. Create a function deleteRestaurantById that accepts a restaurant ID and deletes the restaurant data from the db. Take any restaurant id from your database and delete the records of that restaurant.
async function deleteRestaurantById(restaurantID) {
    try{
        const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantID);
        console.log("Deleted Restaurant : ", deletedRestaurant)
    } catch(error){
        console.log("Error in Deleting the Data", error);
    }
}
deleteRestaurantById("68ebaab24dfae64ce3956645"); // New Restaurant

// 2. Create a function deleteRestaurantByName that accepts a restaurant name and deletes the restaurant data from the db. Take any restaurant name from your database and delete the records of that restaurant.
async function deleteRestaurantByName(restuarantName) {
    try{
        const deletedRestaurant = await Restaurant.findOneAndDelete({name: restuarantName});
        console.log("Deleted Restaurant : ", deletedRestaurant)
    } catch(error){
        console.log("Error in Deleting the Data", error);
    }
}
deleteRestaurantByName("Yo China");