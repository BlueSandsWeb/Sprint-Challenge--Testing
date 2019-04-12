const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');
const knex = require('knex');

// testing endpoints
//returns correct http status code

describe('server.js', () => {
  afterEach(async () => {
    await db('games').truncate();
    await db('games').insert({ "title": "Pacman", "genre": "Arcade", "releaseYear": 1980 })
    await db('games').insert({ "title": 'Adventure Island', "genre": 'Console', "releaseYear": 1989 })
    await db('games').insert({ "title": "Arkanoid", "genre": "Arcade", "releaseYear": 1984 })
    await db('games').insert({ "title": "Mario", "genre": "Console", "releaseYear": 1986 })
    await db('games').insert({ "title": "Super Mario", "genre": "Console", "releaseYear": 1995 })
  })
  describe('GET /games', () => {
    it('should respond with 200 OK', () => {
      return request(server).get('/games').expect(200);    // Shorter syntax (for status codes)
    })

    it('should return JSON', () => {
      return request(server).get('/games').then(res => {
        expect(res.type).toBe('application/json');
      })
    })

    it('should return an Array', () => {
      return request(server).get('/games').then(res => {
        expect(res.body).toHaveLength(5);
      })
    })

    it('should return an array even if DB is empty', async () => {
      await db('games').truncate();
      const response = await request(server).get('/games');
      expect(response.body).toEqual([]);
    })
  })

  describe('POST /games', () => {

    // returns status 400 if info sent is incomplete
    it('should return status 400 when missing info', async () => {
      const response = await request(server).post('/games');
      expect(response.status).toBe(422);
    })

    // returns message 'Please fill in all fields if  info sent is incomplete'
    it('should return message "Please fill in all fields if info sent is incomplete"', async () => {
      const response = await request(server).post('/games');
      expect(response.text).toBe("{\"error\":\"Please fill in all fields\"}")
    })

    // returns status code of 201 when info is correct
    it('should return status 201 when adding game to db', async () => {
      const newGame = { title: "PacMan2", genre: "Arcade", releaseYear: "1984" }
      const response = await request(server).post('/games').send(newGame);
      expect(response.status).toBe(201);
    })

    // **** If you change seed data at the top, fix this test! ****
    it('actually added game to the DB', async () => {
      const newGame = { "title": "PacMan2", "genre": "Arcade", "releaseYear": 1984 }
      const response = await request(server).post('/games').send(newGame);
      expect(response.type).toBe('application/json');
      newGame.id = 6;
      expect(response.body).toEqual(newGame);
    });
  })
})