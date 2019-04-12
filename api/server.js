const express = require('express');
const server = express();
const db = require('../data/dbConfig.js');

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).send("Hello");
});

server.get('/games', async (req, res) => {
  const games = await db('games');
  res.status(200).json(games);
})

server.post('/games', async (req, res) => {
  try {
    if (!req.body.title || !req.body.releaseYear || !req.body.genre) {
      res.status(422).json({ error: 'Please fill in all fields' });
    } else {
      const [id] = await db('games').insert(req.body);
      const newGame = await db('games').where({ id }).first()
      res.status(201).json(newGame);
    }
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error` })
  }
})

module.exports = server;