const {initializeDatabase} = require("../db/db.connect");
const Restaurant = require("./models/restaurant.models");

initializeDatabase();

const newRestaurant = {
  name: "Bella Bistro",
  cuisine: ["Italian", "Mediterranean"],
  location: "456 Elm Street, Foodville",
  rating: 4.5,
  reviews: [],
  website: "https://bellabistro.example.com",
  phoneNumber: "+19876543210",
  openHours: "Mon-Sun: 10:00 AM - 11:00 PM",
  priceRange: "$$ (11-30)",
  reservationsNeeded: true,
  isDeliveryAvailable: false,
  menuUrl: "https://bellabistro.example.com/menu",
  photos: [
    "https://bellabistro.example.com/photos/photo1.jpg",
    "https://bellabistro.example.com/photos/photo2.jpg",
    "https://bellabistro.example.com/photos/photo3.jpg"
  ],
};

async function createRestaurant(newRestaurant){
    try{
        const restaurant = new Restaurant(newRestaurant);
        const saveRestaurant = await restaurant.save();
        console.log("Restaurant Data Added: ", saveRestaurant);
    } catch(error){
        throw error;
    }
};

createRestaurant(newRestaurant);