const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
const Movie = require("../BE1.1/models/movie.model");
app.use(express.json());
app.use(cors(corsOptions));
initializeDatabase();

async function createMovie(newMovie){
    try{
        const movie = new Movie(newMovie);
        const saveMovie = await movie.save();
        return(saveMovie);
    } catch (error){
        throw error;
    }
};

app.post("/movies", async(req, res) => {
    try{
        const movieToAdd = await createMovie(req.body);
        res.status(201).json({message: "Movie Added Successfully.", movieAdded: movieToAdd});
    } catch(error){
        // res.status(500).json({error: error.message});
        res.status(500).json({error: "Failed to Add Movie."});
    }
})

async function deleteMovie(movieId){
    try{
        if (!movieId || movieId === "undefined") {
            throw new Error("Invalid movie ID");
        }
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
async function readMovieByTitle(movieTitle){
    try{
        const movie = await Movie.findOne({title: movieTitle});
        return(movie);
    } catch(error){
        throw error
    }
}
app.get("/movies/title/:title", async (req, res) => {
    try{
        const movie = await readMovieByTitle(req.params.title);
        if(movie){
            res.json(movie);
        } else {
            res.status(404).json({error: "Movie Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Movie."});
    }
})
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