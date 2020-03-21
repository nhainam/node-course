const request = require('supertest');
const { User } = require('../../models/user');
const { Genre } = require('../../models/genre');

describe('Auth middleware', () => {
    let server;

    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => { 
      await Genre.remove({});
      await server.close(); 
    }); 

    let token;

    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'Genre1' });
    }

    beforeEach(() => {
        token = new User().generateAuthToken();
    });

    it('should return 401 if no token is provided', async () => {
        token = "";
        const req = await exec();
        expect(req.status).toBe(401);
    });

    it('should return 400 if token is invaild', async () => {
        token = "a";
        const req = await exec();
        expect(req.status).toBe(400);
    });

    it('should return 200 if token is vaild', async () => {
        const req = await exec();
        expect(req.status).toBe(200);
    });
});