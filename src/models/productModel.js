const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    name: String,
    category: String,
    price: {
        type: Number,
        default: 100,
        required: true
    }
  
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema)

