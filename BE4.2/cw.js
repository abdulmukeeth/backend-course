const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
const Movie = require("../BE1.1/models/movie.model");
initializeDatabase();

/*
{
  "title": "Zindagi Na Milegi Dobara",
  "shortName": "ZNMD",
  "releaseYear": 2011,
  "genre": ["Adventure", "Drama", "Comedy"],
  "director": "Zoya Akhtar",
  "actors": ["Hrithik Roshan", "Farhan Akhtar", "Abhay Deol", "Katrina Kaif", "Kalki Koechlin"],
  "language": "Hindi",
  "country": "India",
  "rating": 8.2,
  "plot": "Three friends take a road trip across Spain that turns into a journey of self-discovery, adventure, and healing.",
  "awards": "Won multiple Filmfare Awards including Best Film and Best Director",
  "posterUrl": "https://upload.wikimedia.org/wikipedia/en/8/87/Zindagi_Na_Milegi_Dobara.jpg",
  "trailerUrl": "https://www.youtube.com/watch?v=FJrpcDgC3zU"
}
*/

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