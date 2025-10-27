const express = require("express");
const app = express();
app.use(express.json());

// 1. Write a GET route "/" which sends a message "Hello, From Express Server.". Test your API with Postman.
app.get("/", (req, res) => {
    res.send("Hello, From Express Server.");
})

// 2. Write a DELETE route which deletes a book with id 1, from the pre-defined books array. Send an error message "Book not found" in case the book does not exist.
// Pre-defined books array:
const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949 }
];
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const index = books.findIndex(book => book.id == bookId);
    if(index == -1){
        res.status(404).json({error: "Book Not Found"});
    } else {
        books.splice(index, 1);
        res.status(200).json({message: "Book Deleted Successfully."})
    }
})

// 3. Write a GET route "/books" which sends the books array in response. Test your API with Postman and see that the above book with id 1 is deleted.
app.get("/books", (req, res) => {
    res.send(books);
})

// 4. Write a DELETE route which deletes a todo with id 4, from the pre-defined todos array. Send an error message "Todo does not exist", in case any todo is not found.
// Pre-defined todos array:
const todos = [
  { id: 1, title: 'Water the plants', day: 'Saturday' },
  { id: 2, title: 'Go for a walk', day: 'Sunday' },
  { id: 4, title: 'Complete HW 1 of BE3.3', day: 'Saturday'},
];
app.delete("/todos/:id", (req, res) => {
    const todoId = req.params.id;
    const index = todos.findIndex(todo => todo.id == todoId);
    if(index == -1){
        res.status(404).json({error: "Todo does not exist"});
    } else {
        todos.splice(index, 1);
        res.status(200).json({message: "Todo Deleted Successfully."})
    }
})

// 5. Write a GET route "/todos" which sends the todos array in response. Test your API with Postman.
app.get("/todos", (req, res) => {
    res.send(todos);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Running on PORT", PORT);
})