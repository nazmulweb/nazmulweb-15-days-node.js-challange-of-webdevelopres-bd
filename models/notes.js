const mongoose = require('mongoose');
const { Schema } = mongoose

const notesSchema = new Schema({
    title: String,
    description: String,
    woner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        reqired: true
    }
},

    {
        timestamps: true
    })


const Note = mongoose.model('Note', notesSchema)
module.exports = Note