// This file is for hosting the backend for the HW1 and HW@2 combined along with react frontend
const { initializeDatabase } = require("../db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
const Movie = require("../BE1.1/models/movie.model");
const Hotel = require("../BE2.1/models/hotel.models");
const Book = require("../BE1.1/models/book.models");
initializeDatabase();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

async function readAllHotels(){
    try{
        const hotels = await Hotel.find();
        return(hotels);
    } catch(error){
        throw(error);
    }
}
app.get("/hotels", async (req, res) => {
    try{
        const hotels = await readAllHotels();
        if(hotels.length != 0){
            res.send(hotels);
        } else {
            res.status(404).json({error: "Hotel Not Found"});
        }
    } catch(error){
        res.status(500).json({error: "Failed to Fetch Hotel Data"})
    }
})
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

// 1. Create an API with route "/books" to create a new book data in the books Database. Make sure to do error handling. Test your API with Postman. Add the following book:
async function createBook(newBook){
    try{
        const book = new Book(newBook);
        const saveBook = await book.save();
        return(saveBook);
    } catch (error){
        throw error;
    }
};
app.post("/books", async(req, res) => {
    try{
        const bookToAdd = await createBook(req.body);
        res.status(201).json({message: "Book Added Successfully.", bookAdded: bookToAdd});
    } catch(error){
        // res.status(500).json({error: error.message});
        res.status(500).json({error: "Failed to Add Book."});
    }
})
// 2. Run your API and create another book data in the db.

// 3. Create an API to get all the books in the database as response. Make sure to do error handling.
async function readAllBooks(){
    try{
        const allBooks = await Book.find();
        return(allBooks);
    } catch(error){
        console.log(error);
    }
}
app.get("/books", async (req, res) => {
    try{
        const books = await readAllBooks();
        if(books.length != 0){
            res.json(books);
        }else {
            res.status(404).json({error: "Books Not Found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch Books."});
    }
})
// 4. Create an API to get a book's detail by its title. Make sure to do error handling.
async function getBookByTitle(titleName) {
    try {
        const book = await Book.findOne({ title: titleName });
        return(book);
    } catch (error) {
        throw error;
    }
}
app.get("/books/title/:title", async (req, res) => {
    try {
        const { title } = req.params;
        const book = await getBookByTitle(title);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: `No book found with title '${title}'` });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch book by title." });
    }
});
// 5. Create an API to get details of all the books by an author. Make sure to do error handling.
async function getBooksByAuthor(author) {
    try {
        const books = await Book.find({ author: author });
        return books;
    } catch (error) {
        throw error;
    }
}
app.get("/books/author/:author", async (req, res) => {
    try {
        const { author } = req.params;
        const books = await getBooksByAuthor(author);
        if (books.length !== 0) {
            res.json(books);
        } else {
            res.status(404).json({ error: `No books found by author '${author}'.` });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books by author." });
    }
});
// 6. Create an API to get all the books which are of "Business" genre.
async function getBooksByGenre(genreName) {
    try {
        const books = await Book.find({ genre: genreName });
        return books;
    } catch (error) {
        throw error;
    }
}

app.get("/books/genre/:genre", async (req, res) => {
    try {
        const genreName = req.params.genre;
        const books = await getBooksByGenre(genreName);
        if (books.length !== 0) {
            res.json(books);
        } else {
            res.status(404).json({ error: `No ${genreName} books found.` });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch business books." });
    }
});
// 7. Create an API to get all the books which was released in the year 2012.
async function getBooksByYear(year) {
    try {
        const books = await Book.find({ publishedYear: year });
        return books;
    } catch (error) {
        throw error;
    }
}
app.get("/books/publishedYear/:year", async (req, res) => {
    try {
        const { year } = req.params;
        const books = await getBooksByYear(Number(year));
        if (books.length !== 0) {
            res.json(books);
        } else {
            res.status(404).json({ error: `No books found from year ${year}.` });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books by year." });
    }
});
// 8. Create an API to update a book's rating with the help of its id. Update the rating of the "Lean In" from 4.1 to 4.5. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.
// Updated book rating: { "rating": 4.5 }
app.post("/books/:id/rating", async (req, res) => {
    try {
        // console.log(req.body.rating);
        const updatedBook = await Book.findByIdAndUpdate(req.params.id,{ rating: req.body.rating },{ new: true } );
        if (!updatedBook) {
            return res.status(404).json({ error: "Book does not exist" });
        }
        res.json({message: "Book rating updated successfully.",updatedBook: updatedBook,});
    } catch (error) {
        // res.status(500).json({ error: "Failed to update book rating." });
        res.status(500).json({error: error.message});
    }
});
// 9. Create an API to update a book's rating with the help of its title. Update the details of the book "Shoe Dog". Use the query .findOneAndUpdate() for this. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.
// Updated book data: { "publishedYear": 2017, "rating": 4.2 }
app.post("/books/title/:title", async (req, res) => {
    try {
        const title = req.params.title;
        const updateData = req.body;
        const updatedBook = await Book.findOneAndUpdate({ title: title }, updateData,{ new: true });
        if (!updatedBook) {
            return res.status(404).json({ error: "Book does not exist" });
        }
        res.json({message: "Book details updated successfully.",updatedBook: updatedBook});
    } catch (error) {
        res.status(500).json({ error: "Failed to update book details." });
    }
});

// 10. Create an API to delete a book with the help of a book id, Send an error message "Book not found" in case the book does not exist. Make sure to do error handling.
app.delete("/books/:id", async (req, res) => {
    try {
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({message: "Book deleted successfully.", deletedBook: deletedBook});
    } catch (error) {
        res.status(500).json({ error: "Failed to delete book." });
    }
});
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
    console.log("Server is Running on PORT xxxx");
})