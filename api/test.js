
const express = require('express');
const app = express();
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();

const kcConfig = {
  clientId: 'my-api',
  bearerOnly: true,
  serverUrl: 'http://localhost:8080',
  realm: 'my-realm',
  realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2KwZmOXbSoPIwbUkGtXyE7C53H1IxscH3iEJgh0wYOQMzcdEal1N4dkcKO2iynNuoXj4mUB/GAarGb90Webs4Lk0bi028effW2gvjKtiZNcrgFtxAaovzVZnOct3ks5VsnTiryiy2iqHxNZmCI6syjfnQkdbQqU2LwAY4dXhlX/jMf8k5Lk/dq7RVRo4ihXG+S903yOvNW6T9zHvnxqx4cB7eXuxx9Q6SOij6psHI7Jz7YXXZBH9N2mc0Ou8h3Mf6Z6tnmQkhHJg8OcDJUGLH2LmU5SCHDfAPY9PAvgIAaX4TkcRNRJ/jNlwFBqEPVzpwazQwa7oyRDW4utNN2Xq4wIDAQAB'
};

app.use(
  session({
    secret: 'yeoxAXal5E69dfH0bmFuckvcF37NbQBp',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

const keycloak = new Keycloak({ store: memoryStore }, kcConfig);

app.use( keycloak.middleware() );

app.get('/', function (req, res) {
  res.send("Server is up!");
});

app.get('/hello', keycloak.protect(), (req, res) => {
  res.send('hello world');
})

app.listen(3001, () => {
  console.log("App listening on port 3001")
});
