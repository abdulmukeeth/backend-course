const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    category: {
        type: String,
        enum: [
           'Personal', 'Work', 'Study', 'Ideas', 'Journal', 'Other'  
        ],
    },
    tags: [{
        type: String,
    }],   
},
{
timestamps: true,
},
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;