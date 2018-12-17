const userRoutes = require('./userRoutes');

module.exports = function(app) {
    app.use('/users', userRoutes);
};