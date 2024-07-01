
const express = require('express');
const app = express();
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const logger = require('./logger-middleware.js');
const axios = require('axios');
const cors = require('cors')
app.use(cors({origin: ["http://localhost:5173", "http://localhost:5173/*", "http://localhost:4000"]}));
app.use(cors());
app.use(express.json());
app.use(logger);

require('dotenv').config();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('Waiting for 50 seconds...');
  await sleep(50000);
  console.log('Starting server...');


  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
  const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const taylorSwiftSpotifyId = process.env.TAYLOR_SWIFT_SPOTIFY_ID;
  const apiSecret = process.env.API_SECRET || "**********";
  const port = process.env.PORT || 3000;


  async function getSpotifyToken() {
    const tokenRequest = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString('base64')),
      },
    })

    const data = await tokenRequest.json();
    const token = data.access_token;
    return token;
  }

  let spotifyAccessToken = await getSpotifyToken();

  setInterval(async () => {
    spotifyAccessToken = await getSpotifyToken();
  }, 3600000)

  // section - db
  const mongoose = require('mongoose');
    
  mongoose.connect(`mongodb://${username}:${password}@localhost:27017/fans?authSource=admin`).then(res => console.log("Connection to mongodb succesful"));
  const Fan = mongoose.model('Fan', { name: String, age: Number, fakeFan: Boolean });
  // end section - db
  
  // section - kc
  async function fetchRealmPublicKey() {
    try {
      const response = await axios.get('http://localhost:8080/realms/my-realm');
      console.log(response);
      return response.data.public_key;
    } catch (error) {
      console.error('Error fetching certs:', error);
    }
  };
  
  const realmPublicKey = await fetchRealmPublicKey();
  console.log(realmPublicKey)

  const memoryStore = new session.MemoryStore();
  
  const kcConfig = {
    clientId: 'my-api',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080',
    realm: 'my-realm',
    realmPublicKey
  };
  
  app.use(
    session({
      secret: apiSecret, // not necessary for the flow, but necessary for the library to work
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
  );
  
  const keycloak = new Keycloak({ store: memoryStore }, kcConfig);
  
  app.use(keycloak.middleware());
  
  function getRoles(req){
    return req.kauth.grant.access_token.content.resource_access["my-api"]?.roles;
  }
  
  function SPA(req, res, next) {
    keycloak.protect()(req, res, () => {
      const token = req.kauth.grant.access_token;
      if (token && token.content.azp === 'my-SPA') {
        next();
      } else {
        res.status(403).send({ message: 'Forbidden' });
      }
    });
  }
  
  function SPARoles(roles){
    return (req, res, next) => keycloak.protect()(req, res, () => {
      const token = req.kauth.grant.access_token;
      if (token && token.content.resource_access["my-api"]?.roles?.find(role => roles.includes(role))) {
        next();
      } else {
        res.status(403).send({ message: 'Forbidden' });
      }
    });
  }
  
  // end section - kc
  
  
  // section - routes
  app.get('/fans', SPA, async (req, res) => {
    try {
      const fans = await Fan.find();
      const roles = getRoles(req);

      if (roles.find(role => ["admin", "moderator"].includes(role))) {
        res.status(200).json(fans);
      } else {
        const fansLimitedData = fans.map(fan => ({_id: fan._id, name: fan.name, age: fan.age}));
        res.status(200).send(fansLimitedData);
      }
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.post('/fan', SPARoles(["admin"]), async (req, res) => {
    try {
      const {name, age, fakeFan} = req.body;
      const fan = new Fan({name, age, fakeFan})
      const responseData = await fan.save().then(() => console.log('New fan saved in the database!'));
      res.status(201).json(responseData)
    } catch (e) {
      console.error(e)
      res.status(500).send(e)
    }
  });
  
  app.put('/fan/:id', SPARoles(["admin"]), async (req, res) => {
    try {
      const fanId = req.params.id;
      const {name, age, fakeFan} = req.body;
  
      const responseData = await Fan.findOneAndUpdate(
        { _id: fanId },
        { name, age, fakeFan },  
        { new: true, useFindAndModify: false }
      )
      res.status(201).json(responseData)
    } catch (e) {
      console.error(e)
      res.status(500).send(e)
    }
  });
  
  app.delete('/fan/:id', SPARoles(["admin", "moderator"]), async (req, res) => {
    try {
      const { id } = req.params;
      Fan.deleteOne({ _id: id }).then(() => {
        console.log('Fan deleted successfully.');
      });
      res.status(200).send();
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  });

  // m2m, external api
  app.get('/tf-stats', keycloak.protect(), async (req, res) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${taylorSwiftSpotifyId}/top-tracks`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + spotifyAccessToken },
    });
  
    const responseData = await response.json(); 

    const responseShortData = responseData.tracks.map(track => ({name: track.name, urls: track.external_urls.spotify})); 
    
    res.status(200).send(responseShortData);
  })
  
  
  app.get('/counter', keycloak.protect(), async (req, res) => {
    const counter = await Fan.countDocuments();
    res.status(200).send({counter});
  });
  
  app.listen(port, () => {
    console.log('Server is running on port ' + port);
  });
}

main()