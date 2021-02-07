const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

/// database connection
mongoose.connect('mongodb+srv://Kenan:Kenan12345@node-rest-shop.h16df.mongodb.net/<dbname>?retryWrites=true&w=majority');

/// for logging
app.use(morgan('dev'));
/// for body parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/// headers middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");

    /// browser send OPTIONS request first [PUT], [POST] requests
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

        return res.status(200).json({});
    }

    next();
});

/// routes
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

/// error handling
app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.setStatus = 404;
    next(error);
});

/// error response
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;
