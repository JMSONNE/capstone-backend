const productRoutes = require('./routes/API/products');
const userRoutes = require('./routes/API/users');


module.exports = function (app) {
    app.use('/api', productRoutes);
    app.use('/api', userRoutes);
}