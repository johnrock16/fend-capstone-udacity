const request = require('supertest');
const server = require('../index');


describe('test endpoints', () => {
    it('getPlace', (done) => {
        request(server).post('/getPlace').send({ placename: 'São Paulo' }).expect(200,done);
    });
    it('getWeather', (done) => {
        request(server).post('/getWeather').send({ lat:-23.4472675369128,lon:-46.9172196174496}).expect(200,done);
    });
    it('getPlaceImages', (done) => {
        request(server).post('/getPlaceImages').send({ placename: 'São Paulo' }).expect(200,done);
    });
    afterAll(done => {
        done();
    });
});