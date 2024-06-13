const express = require('express');
const router = express.Router();
const { addNoteBook } = require('../controllers/noteBookCtrl');
const { GetAllNoteBook } = require('../controllers/noteBookCtrl');
const { Client } = require('pg');
const { USER, PASSWORD, HOST, PORT, DATABASE } = require('../config.json');

// Création d'un nouveau client
const client = new Client({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
});

// Connexion à la base de données
client.connect((err) => {
  if (err) throw err;
});

//Routes
router.post('/add', (req, res) => addNoteBook(req, res, client));
router.post('/get', (req, res) => GetAllNoteBook(req, res, client));


module.exports = router;
