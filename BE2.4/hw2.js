const { initializeDatabase } = require("../db/db.connect");
const Hotel = require("../BE2.1/models/hotel.models");
initializeDatabase();

// 1. Create a function deleteHotelById that accepts a hotel ID and deletes the hotel data from the db. Take any hotel id from your database and delete the records of that hotel.
async function deleteHotelById(hotelID) {
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(hotelID);
        console.log("Deleted Hotel : ", deletedHotel)
    } catch(error){
        console.log("Error in Deleting the Data", error);
    }
}
deleteHotelById("68ee913869be74d0bb88098c"); // River View Hotel

// 2. Create a function deleteHotelByPhoneNumber that accepts a hotel's phone number and deletes the hotel data from the db. Take any hotel phone number from your database and delete the records of that hotel.
async function deleteHotelByPhoneNo(hotelPhoneNo) {
    try{
        const deletedHotel = await Hotel.findOneAndDelete({phoneNumber: hotelPhoneNo});
        console.log("Deleted Hotel : ", deletedHotel)
    } catch(error){
        console.log("Error in Deleting the Data", error);
    }
}
deleteHotelByPhoneNo("+1234555890"); // Lake View Hotel