const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    name: {
        type: String, 
        required: true
    },
    author_id:Number, 
    prices: Number,
    ratings: Number

}, { timestamps: true });


module.exports = mongoose.model('Book3', bookSchema) 

