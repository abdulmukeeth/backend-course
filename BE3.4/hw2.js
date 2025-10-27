const express = require("express");
const app = express();
app.use(express.json());
// 1. Write a GET route "/" which sends a message "Express server.". Test your API with Postman.
app.get("/", (req, res)=>{
    res.send("Express server.");
})
// 2. Write a POST route which updates a movie with id 2, present in the pre-defined movies array. Send an error message, "Movie not found", in case that movie is not found.
// Movie to be updated:   { "id": 2, "title": "Dune 2", "director": "Denis Villeneuve", "year": 2024 }
// Pre-defined movies array:
const movies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
  { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 },
  { id: 3, title: 'The Shawshank Redemption', director: 'Frank Darabont', year: 1994 }
];
app.post("/movies/:id", (req, res) => {
    const movieId = parseInt(req.params.id);
    const updatedMovieData = req.body;
    const movieToUpdate = movies.find(movie => movie.id === movieId);
    if(!movieToUpdate){
        res.status(404).json({error: "Movie Not Found"});
    } else {
        if(!updatedMovieData.title || !updatedMovieData.director || !updatedMovieData.year){
            res.status(400).json({error: "Title, Director and Year are Required."});
        } else {
            Object.assign(movieToUpdate, updatedMovieData);
            res.status(200).json({message: "Movie Updated Successfully.", updatedMovie: movieToUpdate});
        }
    }
})
// 3. Write a GET route "/movies" which sends the movies array in response. Test your API with Postman.
app.get("/movies", (req, res) => {
    res.send(movies);
})
// 4. Write a POST route which updates the details of item with id 1, present in the pre-defined items array. Send an error message, "Item not found" in case the item is not present in the array.
// Item to be updated:   { "id": 1, "itemName": "Spoon", "color": "Golden", "quantity": 12}
// Pre-defined items array:
const items = [
  { id: 1, itemName: 'Spoon', color: 'Silver', quantity: 8},
  { id: 2, itemName: 'Fork', color: 'Silver', quantity: 8 },
  { id: 3, itemName: 'Plate', color: 'Off-White', quantity: 6 }
];
app.post("/items/:id", (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItemData = req.body;
    const itemToUpdate = items.find(item => item.id === itemId);
    if(!itemToUpdate){
        res.status(404).json({error: "Item Not Found."});
    } else {
        if(!updatedItemData.itemName || !updatedItemData.color || !updatedItemData.quantity){
            res.status(400).json({error: "ItemName, Color and Quantity are Required."});
        } else {
            Object.assign(itemToUpdate, updatedItemData);
            res.status(200).json({message: "Item Updated Successfully.", updatedItem: itemToUpdate})
        }
    }
})
// 5. Write a GET route "/items" which sends the items array in response. Test your API with Postman.
app.get("/items", (req, res) => {
    res.send(items);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Running @ PORT ", PORT);
})