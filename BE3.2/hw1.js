const express = require("express");
const app = express();
app.use(express.json());

// 1. Write a GET route "/" which sends a message "Hello, Express server.". Test your API with Postman.
app.get("/", (req, res)=>{
    res.send("Hello, Express server.");
});
// 2. Write a POST route "/books" which sends a new book into the pre-defined books array. Send an error message in case any of the data is missing in the request body. Test your API with Postman.
// New book to be added:   { id: 3, title: '1984', author: 'George Orwell', year: 1949 }
// Pre-defined books array:
const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 }
];

app.post("/books", (req, res) => {
    const newBook = req.body;
    if(!newBook.title || !newBook.author || !newBook.year){
        res.status(400).json({error: "Title, Author and Year are Required"});
    } else {
        books.push(newBook);
        res.status(201).json({message: "Book Added Successfully.", book: newBook});
    }
})
// 3. Write a GET route "/books" which sends the books array in response. Test your API with Postman.
app.get("/books", (req,res) => {
    res.send(books);
})

// 4. Write a POST route "/todos" which sends a new todo into the pre-defined todos array. Send an error message in case any of the data is missing in the request body. Test your API with Postman.
// New todo to be added:   { id: 2, title: 'Go for a walk', day: 'Sunday' }
// Pre-defined todos array:
const todos = [
  { id: 1, title: 'Water the plants', day: 'Saturday' },
];
app.post("/todos", (req, res) => {
    const newTodo = req.body;
    if(!newTodo.title || !newTodo.day){
        res.status(400).json({error: "Title and day is required"});
    } else {
        todos.push(newTodo);
        res.status(201).json({message: "Todo Added Successfully.", todoAdded: newTodo});
    }
})
// 5. Write a GET route "/todos" which sends the todos array in response. Test your API with Postman.
app.get("/todos", (req,res) => {
    res.send(todos);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Running on Server", PORT)
})