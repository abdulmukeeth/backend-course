const { initializeDatabase } = require("../db/db.connect");
const fs = require("fs");
const Book = require("../BE1.1/models/book.models");

initializeDatabase();

const jsonData = fs.readFileSync("books.json","utf-8");
const booksData = JSON.parse(jsonData);

function seedData(){
    try{
        for(const book of booksData){
            const newBook = new Book({
                title: book.title,
                author: book.author,
                publishedYear: book.publishedYear,
                genre: book.genre,
                language: book.language,
                country: book.country,
                rating: book.rating,
                summary: book.summary,
                coverImageUrl: book.coverImageUrl,
            });
            newBook.save();
        }
    } catch (error){
        console.log("Error in seeding the data", error);
    }
}

seedData();
