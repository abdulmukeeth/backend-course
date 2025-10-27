const express = require("express");
const app = express();
app.use(express.json());
// 1. Write a GET route "/" which sends a message "Express server.". Test your API with Postman.
app.get("/", (req,res)=> {
    res.send("Express server.");
});
// 2. Write a POST route "/movies" which sends a new movie into the pre-defined movies array. Send an error message in case any of the data is missing in the request body. Test your API with Postman.
// New movie to be added:  { id: 3, title: 'The Shawshank Redemption', director: 'Frank Darabont', year: 1994 }
// Pre-defined movies array:
const movies = [ { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 }, { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 }];
app.post("/movies", (req,res)=> {
    const newMovie = req.body;
    if(!newMovie.title || !newMovie.director || !newMovie.year){
        res.status(400).json({error: "Movie Title, Director and Year are Required Fields."});
    } else {
        movies.push(newMovie);
        res.status(201).json({message: "Movie Added Successfully.", movieAdded: newMovie});
    }
});
// 3. Write a GET route "/movies" which sends the movies array in response. Test your API with Postman.
app.get("/movies", (req, res)=> {
    res.send(movies);
})

// 4. Write a POST route "/items" which sends a new item into the pre-defined items array. Send an error message in case any of the data is missing in the request body. Test your API with Postman.
// New item to be added:   { id: 3, itemName: 'Plate', color: 'Off-White', quantity: 6 }
// Pre-defined items array:
const items = [ { id: 1, itemName: 'Spoon', color: 'Silver', quantity: 8}, { id: 2, itemName: 'Fork', color: 'Silver', quantity: 8 }];
app.post("/items", (req,res)=> {
    const newItem = req.body;
    if(!newItem.itemName || !newItem.color || !newItem.quantity){
        res.status(400).json({error: "Item Name, Color and Quantity are Required."});
    } else {
        items.push(newItem);
        res.status(201).json({message: "Item Added Successfully.", itemAdded: newItem});
    }
});

// 5. Write a GET route "/items" which sends the items array in response. Test your API with Postman.
app.get("/items", (req, res) => {
    res.send(items);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Running on Port", PORT);
});











