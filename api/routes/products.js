const express = require('express');
const Product = require('../models/product');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET Working wow'
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });

    product.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));

    res.status(200).json({
        message: 'product created',
        createdProduct: product,
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    if (id === 'special') {
        res.status(200).json({
            id: id,
            message: 'special product',
        });
    } else {
        res.status(200).json({
            id: id,
            message: 'simple product'
        });
    }
});

module.exports = router;
