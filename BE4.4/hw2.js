const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
const Hotel = require("../BE2.1/models/hotel.models");
initializeDatabase();

async function updateHotel(hotelId, dataToUpdate){
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {new: true,});
        return(updatedHotel);
    } catch(error){
        throw error;
    }
}

app.post("/hotels/:hotelId", async(req, res) => {
    try{
        const updatedHotel = await updateHotel(req.params.hotelId, req.body);
        if(updatedHotel){
            res.status(200).json({message: "Hotel Updated Successfully.", updatedHotelRecord: updatedHotel,});
        } else {    
            res.status(404).json({error: "Hotel Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Update Hotel."});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Running on ", PORT);
})