const bodyParser = require('body-parser');
const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const messageRoutes = require('./src/routes/messagesRoutes');
const userModels = require('./models/users');
const {Sequelize, DataTypes} = require('sequelize');
const app = express()
const jwt = require('jsonwebtoken');

require('dotenv').config();
const port = process.env.PORT;
const secretKey = process.env.SECRET_KEY;

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
});

app.use(bodyParser.json());

app.post('/login', async(req, res) => {
  const {username, password} = req.body;

  try{
    const user = await sequelize.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`);
    if(!user){
      return res.status(401).json({message: "Invalid Credentials"});
    }

    const token = jwt.sign({userId: user.id, username: user.username}, secretKey, {expiresIn: '1h'});

    res.json(token);
  } catch(error){
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

app.use('/users', userRoutes);
app.use('/message', messageRoutes);

app.get('/', (req, res) => {
  res.send('Realtime chat app')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})