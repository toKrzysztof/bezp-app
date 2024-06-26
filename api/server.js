
const express = require('express');
const app = express();
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const logger = require('./logger-middleware.js');

const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(logger);
require('dotenv').config();
const mongoose = require('mongoose');

const username = process.env.DB_USERNAME || "admin";
const password = process.env.DB_PASSWORD || "password";

console.log(username, password)

mongoose.connect(`mongodb://${username}:${password}@localhost:27017/users?authSource=admin`).then(res => console.log("Connection to mongodb succesful"));
const memoryStore = new session.MemoryStore();

const kcConfig = {
  clientId: 'my-api',
  bearerOnly: true,
  serverUrl: 'http://localhost:8080',
  realm: 'my-realm',
  realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjsNxmKr/gbs3pIBdVNpyQd6Ty1skCLHcdrZfcxnHn4CbZWDORr/qz1RO6JL+iGo9fbgwYLTCgwK9wU0HOD1ZA7/jrA8edGDY6I65C9+emFP8GTYJ7ZrkVCBf3gDorlc+SH5fcvQpijD3rP5h5B9lmfgvMaIu9ucPDBI/ke0uaojO2MLcG57XZ7RQAF1RXeLYBbCHP+0C+eI4WiniTDwHQBZPz4p1qKI7WE00nLawgwgp4L+aQeyx3+wNeZgwgI81CSsWkZoaPsG/z6GBJ6YpS63FJH4srB9NDTk4iDnp2NzTtw4DxmfXEA9RKTVgiKhZqr8Ym09m0XuFYUMB2RZ2dQIDAQAB'
};

app.use(
  session({
    secret: "**********",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

const keycloak = new Keycloak({ store: memoryStore }, kcConfig);

app.use(keycloak.middleware());

app.get('/hello', keycloak.protect(), (req, res) => {
  res.send('hello world');
})

const User = mongoose.model('User', { name: String, age: Number });

const user = new User({ name: 'Adam', age: 25 });
user.save().then(() => console.log('Zarejestrowano pierwszego usera w bazie'));

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users)
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/user', async (req, res) => {
  try {
    const {name, age} = req.body;
    const user = new User({name, age})
    user.save().then(() => console.log('Zarejestrowano nowego usera w bazie'));
    res.status(201).json(user)
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
});

app.get('/', (req, res) => {
  res.status(200).send("hello world");
});

app.listen(3000, () => {
  console.log('Server is running on port ' + 3000);
});