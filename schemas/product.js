const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, required: false},
    number_of_stocks: {type: Number, required: true}
    })

const Product = mongoose.model("Product", productSchema)

module.exports = Product