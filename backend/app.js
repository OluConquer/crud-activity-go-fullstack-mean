const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

mongoose.connect('mongodb+srv://oluconquer:kFnpRl3DhSFIUbK5@oluconquer.jyksbsn.mongodb.net/myproducts?retryWrites=true&w=majority')
.then(() => {
    console.log('Successfully connected to MongoDB Community Atlas!')
})
.catch((error) => {
    console.log('Unable to connect to MongoDB Community Atlas!');
    console.error(error);
});

// Create a new product in the database
app.post('/api/products', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock
    });

    product.save()
    .then((product) => {
        res.status(201).json({product: product});
    })
    .catch((error) => {
        res.status(400).json({error: error});
    });
});



module.exports = app;