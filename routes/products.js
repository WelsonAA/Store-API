const express = require('express');
const Product = require("../schemas/product");
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find({})
    res.send(products);
});

router.post('/', (req, res) => {
    const body = req.body
    const newProduct = new Product({
        title: body.title,
        price: body.price,
        rating: body.rating,
        number_of_stocks: body.number_of_stocks
    })
    newProduct.save()
    res.send(newProduct)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).send("No ID provided")
        return
    }
    await Product.findByIdAndDelete(id)
    res.send("Deleted")

})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).send("No ID provided")
        return
    }
    const body = req.body
    const product = await Product.findOneAndUpdate({_id: id}, {...body}, {new: true})
    res.send(product)
})

module.exports = router;
