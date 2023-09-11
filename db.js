require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/users")
const productRouter = require("./routes/products")


const PORT =process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

mongoose.connect(process.env.CONNECTION_STRING, {})
    .then(() => {
    console.log("Connected to MongoDB")
    })
    .catch(err => {
        console.log("Error connecting to MongoDB", err)
    })
app.use("/users", userRouter)
app.use("/products", productRouter)

app.listen(PORT,"localhost", () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
});
