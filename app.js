const express = require('express');
const app = express();
const morgan = require('morgan');

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');


/// for logging
app.use(morgan('dev'));

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
