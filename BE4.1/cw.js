const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
const Movie = require("../BE1.1/models/movie.model");
initializeDatabase();

async function readMovieByTitle(movieTitle){
    try{
        const movie = await Movie.findOne({title: movieTitle});
        return(movie);
    } catch(error){
        throw error
    }
}
app.get("/movies/:title", async (req, res) => {
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

async function readMovieByDirector(directorName){
    try{
        const movieByDirector = await Movie.find({director: directorName});
        // const movieByDirector = await Movie.findOne({director: directorName});
        return(movieByDirector);
    } catch(error){
        console.log(error);
    }
}

app.get("/movies/director/:directorName", async(req, res) => {
    try{
        const movies = await readMovieByDirector(req.params.directorName);
        if(movies.length != 0){
            res.json(movies);
        } else {
            res.status(404).json({error: "Movie Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch Movie."});
    }
})

async function readMovieByGenre(genreName){
    try{
        const movieByGenre = await Movie.find({genre: genreName});
        return(movieByGenre);
        // console.log(movieByGenre);
    } catch(error){
        console.log(error);
    }
}

app.get("/movies/genre/:genreName", async(req, res) => {
    try{
        const movies = await readMovieByGenre(req.params.genreName);
        
        if(movies.length != 0){
            res.json(movies);
        } else{
            res.status(404).json({error: "No Movies Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Movie."});
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
})