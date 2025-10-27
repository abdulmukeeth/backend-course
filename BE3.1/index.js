const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
    res.send("Hello Express !");
});

app.get("/about", (req,res) => {
    res.send("this is About Page");
});

app.get("/contact", (req,res) => {
    res.send("Contact us at contact@example.com");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("My Server Is Running on Port ", PORT);
});



