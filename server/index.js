const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoDb = require('./db/mongo').db;
const bodyParser = require('body-parser');
const axios = require('axios');
const protobuf = require('protobufjs');
const protoParser = require('./lib/proto');
const mysql = require('./db/mtaSched');
const { router, setPassport } = require('./routes');
const { googleClientID, googleClientSecret } = require('./env/key');
const txtParser = require('./lib/txt');
const instance = require('./instance');

var app = express();

var logger = (req, res, next) => {
  console.log(`${req.method} request received at ${req.url}`);
  // console.log('session data: ', req.session);
  next();
};
app.use(logger);
app.use(bodyParser.json());

// Static files immediately
app.use(express.static(__dirname + '/dist'));

// Initiate sessions after static files, save store writes
app.use(session({
  secret: 'this is not production grade code',
  store: new MongoStore({ mongooseConnection: mongoDb }),
  resave: false,
  saveUninitialized: false
}));

// Passport initialization
// Dummies until we fully implement login
passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: 'http://localhost:3000/api/user/google/cb',
  scope: [
    'profile'
  ]
 },
 function(accessToken, refreshToken, profile, done) {
   console.log(profile);
   done(null, profile);
 })
);

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

setPassport(passport);

// Initialize routes
app.use('/', router);

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

instance.initialize(); // Start tracking user input

var port = process.env.port || 3000;
app.listen(port, () => console.log(`now listening on ${port}`));
