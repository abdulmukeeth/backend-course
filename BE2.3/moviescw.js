const { initializeDatabase } = require("../db/db.connect");
const Movie = require("../BE1.1/models/movie.model");

initializeDatabase();

async function updateMovieByID(movieId, dataToUpdate){
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {new: true});
        console.log(updatedMovie);
    } catch (error){
        console.log("error in updating movie rating", error);
    }
}

const movieID = "68ee87bc904b6a6dfcbde6bf";
updateMovieByID(movieID, {rating: 9.0})


async function updateMovieByTitle(movieTitle, dataToUpdate){
    try{
        const updatedMovie = await Movie.findOneAndUpdate({title: movieTitle}, dataToUpdate, {new: true});
        console.log(updatedMovie);
    } catch(error){
        console.log("Error in Changing the Data", error)
    }
}
updateMovieByTitle("Kabhi Khushi Kabhie Gham", {releaseYear: 2007});



