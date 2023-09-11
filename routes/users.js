const express = require('express')
const User = require("../schemas/user")
const Product = require("../schemas/product");
const mongoose = require("mongoose");

const router = express.Router()

router.get('/', async (req, res) => {
  const users =await User.find({})
  res.send(users);
});

router.post('/', (req, res) => {
  const body = req.body
  const newUser = new User({
      name: body.name,
      age: body.age,
      email: body.email,
      purchased_products: body.purchased_products
  })
  newUser.save()
  res.send(newUser)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).send("No ID provided")
        return
    }
    await User.findByIdAndDelete(id)
    res.send("Deleted")
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).send("No ID provided")
        return
    }
    const body = req.body
    const user = await User.findOneAndUpdate({_id: id}, {...body}, {new: true})
    res.send(user)

})

router.put('/:id/buy', async (req, res) => {
    const userId = req.params.id;
    const body = req.body; // Assuming you send the product ID in the request body
    const productId = body["product"]
    try {
        // Find the user by ID
        const user = await User.findById(userId);

        // Find the product by ID
        const product = await Product.findById(productId);

        if (!user || !product) {
            return res.status(404).json({ message: 'User or product not found' });
        }

        // Add the product to the user's purchased_products array
        user.purchased_products.push(productId);

        // Save the updated user document
        await user.save();
        res.send(user)
    } catch (error) {
        console.error('Error adding product to user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

})

module.exports = router;
