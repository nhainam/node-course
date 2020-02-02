const debug = require('debug')('app:startup');
const config = require('config');
const logger = require('./middlewares/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const Joi = require('joi');
const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use(express.urlencoded());
app.use(express.static('public'));
app.use(logger);
app.use('/api/courses', courses);
app.use('/', home);

if (app.get('env') === 'development') {
    console.log('Logging is enabled...');
    debug('Morgan enabled...');
}


console.log('Application Name: ' + config.get('name'));
console.log('Email Server: ' + config.get('mail.host'));
console.log('Email Password: ' + config.get('mail.password'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));