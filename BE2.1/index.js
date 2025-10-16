const { initializeDatabase } = require("../db/db.connect");
const Movie = require("../BE1.1/models/movie.model");

initializeDatabase();

const newMovie = {
    title: "Galactic Odyssey",
    releaseYear: 2023,
    genre: ["Sci-Fi"],
    director: "Ava Reynolds",
    actors: ["Liam Turner", "Sophia Martinez", "Ethan Clark"],
    language: "English",
    country: "USA",
    rating: 8.2,
    plot: "In a future where humanity has colonized distant planets, a team of explorers uncovers a mysterious artifact that could alter the fate of the galaxy.",
    awards: "Best Visual Effects - SciFilm Awards 2023",
    posterUrl: "https://example.com/posters/galactic_odyssey.jpg",
    trailerUrl: "https://example.com/trailers/galactic_odyssey.mp4",
};

async function createMovie(newMovie){
    try{
        const movie = new Movie(newMovie);
        const saveMovie = await movie.save();
        console.log("New Movie Saved : ", saveMovie);
    } catch(error){
        console.log("Error in Inserting a Data", error);
    }
};

createMovie(newMovie);
