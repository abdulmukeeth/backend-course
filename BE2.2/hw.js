const { initializeDatabase } = require("../db/db.connect");
const Restaurant = require("../BE2.1/models/restaurant.models");
initializeDatabase();

// 1. Write a function to create a new restaurant data given below.
const newRestaurant1 = {
  name: "Somi",
  cuisine: ["Greek"],
  location: "11 Main Road, Gem",
  rating: 4.3,
  reviews: [],
  website: "https://somi-example.com",
  phoneNumber: "+1234997390",
  openHours: "Tue-Sun: 11:00 AM - 10:00 PM",
  priceRange: "$$ (11-30)",
  reservationsNeeded: false,
  isDeliveryAvailable: true,
  menuUrl: "https://somi-example.com/menu",
  photos: ["https://example.com/somi-photo1.jpg", "https://example.com/somi-photo2.jpg"],
};
async function createRestaurant(newRestaurant){
    try{
        const restaurant = new Restaurant(newRestaurant);
        const saveRestaurant = await restaurant.save();
        console.log("New Restaurant Added: ", saveRestaurant);
    } catch (error){
        throw error;
    }
};
createRestaurant(newRestaurant1);

// 2. Run the same function to create another restaurant data in the database.
const newRestaurant2 = {
  name: "Yo China",
  cuisine: ["Chinese", "Italian"],
  location: "MG Road, Bangalore",
  rating: 3.9,
  reviews: [],
  website: "https://yo-example.com",
  phoneNumber: "+1288997392",
  openHours: "Tue-Sun: 10:00 AM - 11:00 PM",
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isDeliveryAvailable: false,
  menuUrl: "https://yo-example.com/menu",
  photos: ["https://example.com/yo-photo1.jpg", "https://example.com/yo-photo2.jpg", "https://example.com/yo-photo3.jpg"]
};
createRestaurant(newRestaurant2);

// 3. Create a function to read all restaurants from the database. Console all the restaurants. Use proper function and variable names.
async function readAllRestaurants(){
    try{
        const allRestaurants = await Restaurant.find();
        console.log("All Restaurants are : ", allRestaurants);
    } catch(error){
        console.log(error);
    }
}
// readAllRestaurants();

// 4. Create a function to read a restaurant by its name ("New Restaurant"). Console the restaurant details. Use proper function and variable names.
async function readRestaurantByName(restaurantName){
    try{
        const allRestaurants = await Restaurant.findOne({name: restaurantName});
        console.log(`Restaurant with Name as ${restaurantName} : `, allRestaurants);
    } catch(error){
        console.log(error);
    }
}
// readRestaurantByName("New Restaurant");

// 5. Create a function to read all restaurants which offers reservations. Console the restaurant details.
async function readRestaurantByReservations(){
    try{
        const allReservationRestaurants = await Restaurant.find({reservationsNeeded: true})
        console.log("List of Restaurants offering Reservations : ", allReservationRestaurants);
    } catch(error){
        console.log(error);
    }
}
// readRestaurantByReservations();

// 6. Create a function to read all restaurants which offers delivery. Console the restaurant details.
async function readRestaurantByDelivery(){
    try{
        const allDeliveryRestaurants = await Restaurant.find({isDeliveryAvailable: true})
        console.log("List of Restaurants offering deliveries : ", allDeliveryRestaurants);
    } catch(error){
        console.log(error);
    }
}
// readRestaurantByDelivery();

// 7. Create a function to read a restaurant by phone number (+1288997392). Console the restaurant details.
async function readRestaurantByPhoneNo(phoneNo){
    try{
        const restaurant = await Restaurant.find({phoneNumber: phoneNo})
        console.log("Restaurant with matching phone Number : ", restaurant);
    } catch(error){
        console.log(error);
    }
}
// readRestaurantByPhoneNo("+1288997392");

// 8. Create a function to read all restaurants by cuisine ("Italian"). Console all the restaurants with Italian cuisine.
async function readRestaurantByCuisine(cuisineName){
    try{
        const allCuisineRestaurants = await Restaurant.find({cuisine: cuisineName})
        console.log(`List of Restaurants offering ${cuisineName} Cuisine: `, allCuisineRestaurants);
    } catch(error){
        console.log(error);
    }
}
readRestaurantByCuisine("Italian");