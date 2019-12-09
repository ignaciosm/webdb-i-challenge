const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

// GET api

server.get('/', (req, res) => {
  db
    .select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the accounts" });
    });
});

// POST api

server.post('/', (req, res) => {
  const accountsData = req.body;

  db('accounts')
    .insert(accountsData, 'id')
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the accounts" });
    });
});

// UPDATE api

server.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('accounts')
    .where({ id })
    .update(changes)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the accounts" });
    });
});

// DELETE api

server.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('accounts')
    .where({ id })
    .del()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the accounts" });
    });
});



module.exports = server;