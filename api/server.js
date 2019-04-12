const express = require('express');
const server = express();
const db = require('../data/dbConfig.js');

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).send("Hello");
});

server.get('/api/games', async (req, res) => {
  const games = await db('games');
  console.log(games);
  res.status(200).json(games);
})

server.post('/api/games', async (req, res) => {
  res.status(201).send("route working")

})

module.exports = server;