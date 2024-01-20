const bodyParser = require('body-parser');
const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const {Sequelize, DataTypes} = require('sequelize');
const app = express()
require('dotenv').config();
const port = process.env.PORT

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
});

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Realtime chat app')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})