const express = require("express");
const app = express();
app.use(express.json());
// 1. Write a GET route "/" which sends a message "Hello, This is Express Assignment Server.".
app.get("/", (req, res) => {
    res.send("Hello, This is Express Assignment Server.");
})
// 2. Write a POST route "/albums" which sends a new album into the pre-defined albums array. Send an error message in case any of the data is missing in the request body.
// New album to be added:  { "id": 4, "title": "Back in Black", "artist": "AC/DC", "year": 1980 }
// Pre-defined album array:
const albums = [
  { id: 1, title: 'Abbey Road', artist: 'The Beatles', year: 1969 },
  { id: 2, title: 'The Dark Side of the Moon', artist: 'Pink Floyd', year: 1973 },
  { id: 3, title: 'Thriller', artist: 'Michael Jackson', year: 1982 }
];
app.post("/albums", (req, res) => {
    const albumDataToAdd = req.body;
    if(!albumDataToAdd.title || !albumDataToAdd.artist || !albumDataToAdd.year){
        res.status(400).json({error: "Title, Artist and Year are Required."});
    } else {
        albums.push(albumDataToAdd);
        res.status(201).json({message: "Album Added Successfully.", albumAdded: albumDataToAdd});
    }
})
// 3. Write a GET route "/albums" which sends the albums array in response.
app.get("/albums", (req, res) => {
    res.send(albums);
})
// 4. Write a DELETE route which deletes an album with id 2, from the pre-defined albums array. Send an error message "Album not found" in case the album does not exist.
app.delete("/albums/:id", (req, res) => {
    const albumId = parseInt(req.params.id);
    const index = albums.findIndex(album => album.id === albumId);
    if(index === -1){
        res.status(404).json({error: "Album Not Found."});
    } else {
        albums.splice(index, 1);
        res.status(200).json({message: "Album Deleted Successfully."});
    }
})
// 5. Write a route which updates an album data with id 1, present in the pre-defined albums array. Send an error message "Album does not exist", in case any album is not found.
// Updated album data: { "id": 1, "title": "Rumours", "artist": "Fleetwood Mac", "year": 1977 }
 app.post("/albums/:id", (req, res) => {
    const albumId = parseInt(req.params.id);
    const albumDataToUpdate = req.body;
    const albumRecordToUpdate = albums.find(album => album.id === albumId);
    if(!albumRecordToUpdate){
        res.status(404).json({error: "Album Not Found"});
    } else {
        if(!albumDataToUpdate.title || !albumDataToUpdate.artist || !albumDataToUpdate.year){
            res.status(400).json({error: "Title, Artist and Year are Required."});
        } else {
            Object.assign(albumRecordToUpdate, albumDataToUpdate);
            res.status(200).json({message: "Album Updated Successfully.", updatedAlbum: albumRecordToUpdate});
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log("Server Running @ PORT ", PORT);
})