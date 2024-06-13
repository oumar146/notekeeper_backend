const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Client } = require('pg')
const {USER,PASSWORD,HOST,PORT,DATABASE} = require('./config.json') //configuration postgresql
// const userRoutes = require('./router/userRoutes');

//Création d'un nouveau client
const client = new Client({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
})

//Connexion à la base de donnée
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Autoriser la lecture des objets au format JSON
app.use(bodyParser.json());

//Autorisé la communication avec d'autres serveurs
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

//associé une url à une route
// app.use('/api/user', userRoutes);

module.exports = app;
