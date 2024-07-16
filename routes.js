const productRoutes = require('./routes/API/products');
const authRoutes = require('./routes/API/auth');


module.exports = function (app) {
    app.use('/api', productRoutes);
    app.use('/api', authRoutes);
}