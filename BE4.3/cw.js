const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
const Movie = require("../BE1.1/models/movie.model");
initializeDatabase();

async function deleteMovie(movieId){
    try{
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        return(deletedMovie);
    } catch(error){
        throw error;
    }
}

app.delete('/movies/:movieId', async(req, res) => {
    try{
        const deletedMovie = await deleteMovie(req.params.movieId);
        if(deletedMovie){
            res.status(200).json({message: "Movie Deleted Successfully."});
        } else {
            res.status(404).json({ error: "Movie not found." });
        }
    } catch(error){
        res.status(500).json({error: "Failed to Delete Movie."});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
})