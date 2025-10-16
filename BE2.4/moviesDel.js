const { initializeDatabase } = require("../db/db.connect");
const Movie = require("../BE1.1/models/movie.model");

initializeDatabase();

async function deleteMovieById(movieID) {
    try{
        const deletedMovie = await Movie.findByIdAndDelete(movieID);
        console.log("Deleted Movie : ", deletedMovie)
    } catch(error){
        console.log("Error in Deleting the Data", error);
    }
}
// deleteMovieById("68eb8a3b15faa74a6acb17df");

async function deleteMovieByTitle(movieTitle){
    try{
        const deletedMovie = await Movie.findOneAndDelete({title: movieTitle});
        console.log("Deleted Movie : ", deletedMovie)
    } catch(error){
        console.log("Error in Deleting the Data", error);
    }
}
deleteMovieByTitle("Dilwale Dulhania Le Jayenge");