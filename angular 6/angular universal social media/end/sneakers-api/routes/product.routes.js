const express = require('express'),
    productRouter = express.Router(),
    Product = require('../models/product.model');


const routes = () => {
    productRouter.route('/')
        .get((_, res, next) => {
            console.log('product all');
            res.json(Product.getAll());
            next();
        });
    productRouter.route('/:id')
        .get((req, res, next) => {
            console.log('product by id');
            const product = Product.getById(req.params.id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).send('product not found');
            }
            next();
        });
        
    return productRouter;
};

module.exports = routes;