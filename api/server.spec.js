const request = require('supertest');
const server = require('./server.js');

// testing endpoints
//returns correct http status code

describe('server.js', () => {
  describe('GET /', () => {
    it('should respond with 200 OK', () => {
      return request(server).get('/').expect(200);    // Shorter syntax (for status codes)
    })

    it('should return JSON', () => {
      return request(server).get('/').then(res => {
        expect(res.type).toBe('application/json');
      })
    })

    it.skip('should return { api: "up" }', () => {
      return request(server).get('/').then(res => {
        expect(res.body).toEqual({ api: 'up' });
      })
    })
  })
})