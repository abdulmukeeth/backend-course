const { initializeDatabase } = require("../db/db.connect");
const Hotel = require("../BE2.1/models/hotel.models");
initializeDatabase();

// 1. Create a function that accepts a hotel ID and an object with updated data, and updates the hotel data with the provided ID. Take the _id of the hotel from your database which has the name Lake View and update its checkOutTime to 11 AM. Console the updated hotel.
// ID: "68ee913869be74d0bb88098c"
async function updateHotelById(hotelId, dataToUpdate){
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {new : true});
        console.log("Ex1: ", updatedHotel);
    } catch(error){
        console.log("error Updating the Data", error);
    }
}
const hotelID = "68ee913869be74d0bb88098c";
updateHotelById(hotelID, {checkOutTime: "11:00 AM"});

// 2. Create a function that accepts a hotel name and an object with updated data, and updates the hotel data. Take the hotel which has the name "Sunset Resort" and update its rating to 4.2. Console the updated hotel.
async function updateHotelByName(hotelName, dataToUpdate){
    try{
        const updatedHotel = await Hotel.findOneAndUpdate({name: hotelName}, dataToUpdate, {new : true});
        console.log("Ex2: ", updatedHotel);
    } catch(error){
        console.log("error Updating the Data", error);
    }
}
updateHotelByName("Sunset Resort", {rating: 4.2});

// 3. Create a function that accepts a hotel's phone number and an object with updated data, and updates the hotel data. Take the hotel which has the phone number "+1299655890" and update its phone number  to "+1997687392". Console the updated hotel details.
async function updateHotelByPhoneNo(hotelPhoneNo, dataToUpdate){
    try{
        const updatedHotel = await Hotel.findOneAndUpdate({phoneNumber: hotelPhoneNo}, dataToUpdate, {new : true});
        console.log("Ex3: ", updatedHotel);
    } catch(error){
        console.log("error Updating the Data", error);
    }
}
updateHotelByPhoneNo("+1299655890", {phoneNumber: "+1997687392"});