const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/userCtrl');
const { login } = require('../controllers/userCtrl');
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
router.post('/signup', (req, res) => signup(req, res, client));
router.post('/login', (req, res) => login(req, res, client));


module.exports = router;
