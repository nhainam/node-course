
const { Rental } = require('../models/rental');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    if (!req.body.customerId) return res.status(400).send('customerId is not provided');
    if (!req.body.movieId) return res.status(400).send('movieId is not provided');

    const rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId
    });

    if (!rental) return res.status(404).send('no rental found for this customer/movie');

    return res.status(401).send('Unauthorized');
});

module.exports = router;