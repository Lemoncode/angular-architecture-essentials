module.exports.initRoutes = (app) => {
    const productRouter = require('./routes/product.routes');
    app.use('/api/products', productRouter());
};