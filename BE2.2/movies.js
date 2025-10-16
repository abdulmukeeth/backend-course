const { initializeDatabase } = require("../db/db.connect");
const Movie = require("../BE1.1/models/movie.model");

initializeDatabase();

const newMovie = new Movie({
    title: "Saiyaara",
    releaseYear: 2025,
    genre: ["Romance", "Musical", "Drama"],
    director: "Mohit Suri",
    actors: ["Ahaan Panday", "Aneet Padda"],
    language: "Hindi",
    country: "India",
    rating: 8.3,
    plot: "A passionate musician and a shy lyricist fall in love while creating music together, but their relationship is tested by fame, family expectations, and a heartbreaking twist.",
    awards: "Nominated for multiple Filmfare Awards",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/f/fc/Saiyaara_2025_poster.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=9r-tT5IN0vg"
});


async function createMovie(newMovie){
    try{
        const movie = new Movie(newMovie);
        const saveMovie = await movie.save();
        console.log("New Movie Added: ", saveMovie);
    } catch (error){
        throw error;
    }
};

// createMovie(newMovie);

async function readMovieByTitle(movieTitle){
    try{
        const movie = await Movie.findOne({title: movieTitle});
        console.log(movie);
    } catch(error){
        throw error
    }
}

// readMovieByTitle("Dilwale Dulhania Le Jayenge");

async function readAllMovies(){
    try{
        const allMovies = await Movie.find();
        console.log(allMovies);
    } catch(error){
        console.log(error);
    }
}

// readAllMovies();

async function readMovieByDirector(directorName){
    try{
        // const movieByDirector = await Movie.find({director: directorName});
        const movieByDirector = await Movie.findOne({director: directorName});
        console.log(movieByDirector);
    } catch(error){
        console.log(error);
    }
}

readMovieByDirector("Kabir Khan");
