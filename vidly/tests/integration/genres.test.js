const request = require('supertest');
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');
const mongoose = require('mongoose');

describe('/api/genres', () => {
    let server;

    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => { 
        await Genre.remove({});
        await server.close(); 
    });  

    describe('GET /', () => {
        it('should return all genres', async () => {
            const genres = [
                { name: 'genre1' },
                { name: 'genre2' },
            ];
              
            await Genre.collection.insertMany(genres);

            const res = await request(server).get('/api/genres');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return status 404 if request a genre is not exist in database', async () => {
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        });

        it('should return status 404 if no genre with the given id exists', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/genres/' + id);
            expect(res.status).toBe(404);
        });
        
        it('should return a genre if request by a vaild id', async () => {
            const genre = await Genre.create({name: 'Genre1'});
            const id = genre._id;
            const res = await request(server).get('/api/genres/' + id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });
    });

    describe('POST /', () => {
        let token;
        let name;

        beforeEach(() => {
            token = User().generateAuthToken();
            name = "Genre1";
        });

        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({name: name});
        }

        it('should return 401 if client is not logged in', async () => {
            token = "";
            const req = await exec();
            expect(req.status).toBe(401);
        });

        it('should return 400 if genre is less than 5 characters', async () => {
            name = "1234";
            const req = await exec();
            expect(req.status).toBe(400);
        });

        it('should return 400 if genre is great than 50 characters', async () => {
            name = new Array(52).join('a');
            const req = await exec();
            expect(req.status).toBe(400);
        });
        
        it('should save the genre if it is vaild.', async () => {
            const req = await exec();
            expect(req.status).toBe(200);
            expect(req.body).toHaveProperty('_id');
            expect(req.body).toHaveProperty('name', name);
        });
    });
});