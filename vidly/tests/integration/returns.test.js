
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const mongoose = require('mongoose');
const request = require('supertest');

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;

    const exec = () => {
        return request(server)
        .post('/api/returns')
        .set('x-auth-token', token)
        .send({ customerId, movieId });
    };

    beforeEach( async () => { 
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        token = new User().generateAuthToken();
        server = require('../../index');

        rental = new Rental({
            customer: {
                '_id': customerId,
                'name': '12345',
                'phone': '123456'
            },
            movie: {
                '_id': movieId,
                'title': '12345',
                'dailyRentalRate': 2
            }
        });
        await rental.save();

    });

    afterEach(async () => { 
      await Rental.remove({});
      await server.close(); 
    });  

    it('Return 401 if client is not logged in', async () => {
        token = "";

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('Return 400 if customerId is not provided', async () => {
        customerId = "";

       const res = await exec();

        expect(res.status).toBe(400);
    });

    it('Return 400 if movieId is not provided', async () => {
        movieId = "";

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('Return 404 if no rental found for this customer/movie', async () => {
        await Rental.remove({});

        const res = await exec();

        expect(res.status).toBe(404);
    });

    it('Return 400 if rental already processed', async () => {
        await Rental.remove({});

        const res = await exec();

        expect(res.status).toBe(404);
    });
});