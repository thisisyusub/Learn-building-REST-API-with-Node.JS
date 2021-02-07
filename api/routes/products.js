const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET Working wow'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'POST Working wow'
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
