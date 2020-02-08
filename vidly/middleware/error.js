const { logger } = require('../statup/logging');

module.exports = {
    error: function(err, req, res, next) {
        logger.error(err.message, {
            meta: {
                message: err.message,
                name: err.name,
                stack: err.stack
            }
        });
    
        res.status(500).send('Something failed.');
    }
}