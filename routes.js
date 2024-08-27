const productRoutes = require('./routes/API/products');
const authRoutes = require('./routes/API/auth');
const cartRoutes = require('./routes/API/cart');


module.exports = function (app) {
    app.use('/api', productRoutes);
    app.use('/api', authRoutes);
    app.use('/api', cartRoutes);
}