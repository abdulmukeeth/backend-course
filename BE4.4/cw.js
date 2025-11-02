const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
const Movie = require("../BE1.1/models/movie.model");
initializeDatabase();

async function updateMovie(movieId, dataToUpdate){
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {new: true,});
        return(updatedMovie);
    } catch(error){
        throw error;
    }
}

app.post("/movies/:movieId", async(req, res) => {
    try{
        const updatedMovie = await updateMovie(req.params.movieId, req.body);
        if(updatedMovie){
            res.status(200).json({message: "Movie Updated Successfully.", updatedMovieRecord: updatedMovie,});
        } else {    
            res.status(404).json({error: "Movie Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Update Movie."});
    }
});

async function readAllMovies(){
    try{
        const allMovies = await Movie.find();
        return(allMovies);
    } catch(error){
        console.log(error);
    }
}
app.get("/movies", async (req, res) => {
    try{
        const movies = await readAllMovies();
        if(movies.length != 0){
            res.json(movies);
        }else {
            res.status(404).json({error: "Movie Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch Movies."});
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
})