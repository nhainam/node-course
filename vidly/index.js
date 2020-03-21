
const express = require('express');
const app = express();
const {logger, logging} = require('./statup/logging');

require('./statup/routes')(app);
require('./statup/db')();
require('./statup/config')();
require('./statup/validation')();

// Logging all of errors in system
logging();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;