const { initializeDatabase } = require("../db/db.connect");
const Hotel = require("../BE2.1/models/hotel.models");
initializeDatabase();
// 1. Write a function to create a new hotel data given below.
const newHotel1 = {
  name: "Lake View",
  category: "Mid-Range",
  location: "124 Main Street, Anytown",
  rating: 3.2,
  reviews: [],
  website: "https://lake-view-example.com",
  phoneNumber: "+1234555890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Boating"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: false,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: false,
  photos: ["https://example.com/hotel1-photo1.jpg", "https://example.com/hotel1-photo2.jpg"],
};
async function createHotel(newHotel){
    try{
        const hotel = new Hotel(newHotel);
        const saveHotel = await hotel.save();
        console.log("New Hotel Added: ", saveHotel);
    } catch (error){
        throw error;
    }
};
createHotel(newHotel1);
// 2. Run the same function to create another hotel data in the database.
const newHotel2 = {
  name: "Sunset Resort",
  category: "Resort",
  location: "12 Main Road, Anytown",
  rating: 4.0,
  reviews: [],
  website: "https://sunset-example.com",
  phoneNumber: "+1299655890",
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM",
  amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
  priceRange: "$$$$ (61+)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: true,
  isSpaAvailable: true,
  isRestaurantAvailable: true,
  photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
};
// createHotel(newHotel2);

// 3. Create a function to read all hotels from the database. Console all the hotels. Use proper function and variable names.
async function readAllHotels(){
    try{
        const allHotels = await Hotel.find();
        console.log("All Hotels are : ", allHotels);
    } catch(error){
        console.log(error);
    }
}
// readAllHotels();

// 4. Create a function to read a hotel by its name ("Lake View"). Console the restaurant details of Lake View hotel. Use proper function and variable names.
async function readHotelByName(hotelName){
    try{
        const hotelByName = await Hotel.findOne({name: hotelName});
        console.log(`Hotel by Name = ${hotelName} : `, hotelByName);
    } catch(error){
        console.log(error);
    }
}
// readHotelByName("Lake View");

// 5. Create a function to read all hotels which offers parking space. Console all the hotel details.
async function readHotelByParkingSpace(){
    try{
        const allHotelsParkingSpace = await Hotel.find({isParkingAvailable: true})
        console.log("List of Hotels offering Parking Space : ", allHotelsParkingSpace);
    } catch(error){
        console.log(error);
    }
}
// readHotelByParkingSpace();

// 6. Create a function to read all hotels which has restaurant available. Console all the hotels.
async function readHotelByRestaurant(){
    try{
        const allHotelsRestaurant = await Hotel.find({isRestaurantAvailable: true})
        console.log("List of Hotels offering Restaurant : ", allHotelsRestaurant);
    } catch(error){
        console.log(error);
    }
}
// readHotelByRestaurant();

// 7. Create a function to read all hotels by category ("Mid-Range"). Console all the mid range hotels.
async function readHotelByCategory(categoryName){
    try{
        const allHotelsCategory = await Hotel.find({category: categoryName})
        console.log(`List of Hotels with ${categoryName} Category : `, allHotelsCategory);
    } catch(error){
        console.log(error);
    }
}
// readHotelByCategory("Mid-Range");

// 8. Create a function to read all hotels by price range ("$$$$ (61+)"). Console all the hotels.
async function readHotelByPriceRange(givenPriceRange){
    try{
        const allHotelsPriceRange = await Hotel.find({priceRange: givenPriceRange})
        console.log(`List of Hotels with ${givenPriceRange} Price Range : `, allHotelsPriceRange);
    } catch(error){
        console.log(error);
    }
}
// readHotelByPriceRange("$$$$ (61+)");

// 9. Create a function to read all hotels with 4.0 rating. Console the hotels.
async function readHotelByRatings(givenRating){
    try{
        const allHotelsRatings = await Hotel.find({rating: givenRating})
        console.log(`List of Hotels with ${givenRating} Ratings : `, allHotelsRatings);
    } catch(error){
        console.log(error);
    }
}
// readHotelByRatings(4.0);

// 10. Create a function to read a hotel by phone number ("+1299655890"). Console the hotel data.
async function readHotelByPhoneNo(givenPhoneNo){
    try{
        const hotel = await Hotel.find({phoneNumber: givenPhoneNo})
        console.log(`List of Hotels with PhoneNo ${givenPhoneNo} : `, hotel);
    } catch(error){
        console.log(error);
    }
}
// readHotelByPhoneNo("+1299655890");