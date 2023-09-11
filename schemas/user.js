const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: false},
    purchased_products: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
    })

const User = mongoose.model("User", userSchema)

module.exports = User