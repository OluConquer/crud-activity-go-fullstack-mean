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


// Update the product with the provided  _id  with the data provided in the request body.
app.put('/api/products/:id', (req, res, next) => {
    const product = new Product({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock
    });

    Product.updateOne({_id: req.params.id}, product)
    .then(() => {
        res.status(201).json({message: 'Modified!'});
    })
    .catch((error) => {
        res.status(400).json({error: error});
    });
});


// Delete the single product with the provided _id
app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(201).json({message: 'Deleted!'});
    })
    .catch((error) => {
        res.status(404).json({error: error});
    });
});

// Return the single product with the provided _id
app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({_id: req.params.id})
    .then((product) => {
        res.status(200).json({product: product});
    })
    .catch((error) => {
        res.status(404).json({error: error});
    });
});

// Return all products in the database
app.get('/api/products', (req, res, next) => {
    Product.find()
    .then((products) => {
        res.status(200).json({products: products});
    })
    .catch((error) => {
        res.status(400).json({error: error});
    });
});

module.exports = app;