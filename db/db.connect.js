const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
    await mongoose.connect(mongoUri).then(()=>{
    console.log("Connected to Database");
    }).catch(
        (error) => console.log("Error Connecting to Database", error)
    );
}

module.exports = { initializeDatabase };

