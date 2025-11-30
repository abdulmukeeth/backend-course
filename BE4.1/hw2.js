const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
const Hotel = require("../BE2.1/models/hotel.models");
initializeDatabase();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// 1. Create an API with route "/hotels" to read all hotels from the Database. Test your API with Postman.
async function readAllHotels(){
    try{
        const hotels = await Hotel.find();
        return(hotels);
    } catch(error){
        throw(error);
    }
}
app.get("/hotels", async (req, res) => {
    try{
        const hotels = await readAllHotels();
        if(hotels.length != 0){
            res.send(hotels);
        } else {
            res.status(404).json({error: "Hotel Not Found"});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Hotel Data"})
    }
})
// 2. Create an API with route "/hotels/:hotelName" to read a hotel by its name. Test your API with Postman.
async function readHotelByName(hotelName){
    try{
        const hotel = await Hotel.findOne({name: hotelName});
        return(hotel);
    } catch(error){
        throw(error);
    }
}
app.get("/hotels/:hotelName", async(req, res) => {
    try{    
        const hotel = await readHotelByName(req.params.hotelName);
        if(hotel.length != 0){
            res.send(hotel);
        } else {
            res.status(404).json({error: "Hotel Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Hotel Data"})
    }
})
// 3. Create an API with route "/hotels/directory/:phoneNumber" to read a hotel by phone number. Test your API with Postman.
async function readHotelByPhoneNumber(hotelPhoneNumber){
    try{
        const hotel = await Hotel.findOne({phoneNumber: hotelPhoneNumber});
        return(hotel);
    } catch(error){
        throw(error);
    }
}
app.get("/hotels/directory/:phoneNumber", async(req, res) => {
    try{
        const hotel = await readHotelByPhoneNumber(req.params.phoneNumber);
        if(hotel.length != 0){
            res.send(hotel);
        } else {
            res.status(404).json({error: "Hotel Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Hotel Data"})
    }
})
// 4. Create an API with route "/hotels/rating/:hotelRating" to read all hotels by rating. Test your API with Postman.
async function readHotelByRating(hotelRating){
    try{
        const hotel = await Hotel.find({rating: hotelRating});
        return(hotel);
    } catch(error){
        throw(error);
    }
}
app.get("/hotels/rating/:hotelRating", async(req, res) => {
    try{
        const hotel = await readHotelByRating(req.params.hotelRating);
        if(hotel.length != 0){
            res.send(hotel);
        } else {
            res.status(404).json({error: "Hotel Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Hotel Data"})
    }
})
// 5. Create an API with route "/hotels/category/:hotelCategory" to read all hotels by category. Test your API with Postman.
async function readHotelByCategory(hotelCategory){
    try{
        const hotel = await Hotel.find({category: hotelCategory});
        return(hotel);
    } catch(error){
        throw(error);
    }
}
app.get("/hotels/category/:hotelCategory", async(req, res) => {
    try{
        const hotel = await readHotelByCategory(req.params.hotelCategory);
        if(hotel.length != 0){
            res.send(hotel);
        } else {
            res.status(404).json({error: "Hotel Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Hotel Data"})
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Running on ", PORT);
})