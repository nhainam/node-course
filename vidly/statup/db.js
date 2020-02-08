
const mongoose = require('mongoose');
const { logger } = require('./logging');

module.exports = function () {
    mongoose.connect('mongodb://localhost:27018/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => logger.info('Connected to MongoDB...'));
}