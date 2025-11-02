const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
const Hotel = require("../BE2.1/models/hotel.models");
initializeDatabase();

async function deleteHotel(hotelId){
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
        return(deletedHotel);
    } catch(error){
        throw error;
    }
}

app.delete('/hotels/:hotelId', async(req, res) => {
    try{
        const deletedHotel = await deleteHotel(req.params.hotelId);
        if(deletedHotel){
            res.status(200).json({message: "Hotel Deleted Successfully."});
        } else {
            res.status(404).json({ error: "Hotel not found." });
        }
    } catch(error){
        res.status(500).json({error: "Failed to Delete Hotel."});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Running on ", PORT);
})