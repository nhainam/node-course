const config = require("config");
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const users = require('./routes/users');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const express = require('express');
const auth = require('./routes/auth');
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error("FATAL ERROR: jwtPrivate is not defined.");
  process.exit(1);
};

mongoose.connect('mongodb://localhost:27018/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log("Can't connect to MongoDB", err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));