
const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({

    productImage:{
        type: String,
        required: true,
    },    
    productBrandName:{
        type: String,
        required: true,
    },
    productPrice:{
        type: Number,
        required: true,
    },
    productName:{
        type: String,
        required: true,
    },
},{timestamps: true})

module.exports = mongoose.model('Product', productSchema)