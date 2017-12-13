const mongoose = require('mongoose');
const passport = require('passport');
const { googleClientId, googleClientSecret } = require('../env/key');
const User = mongoose.model('User');

const isLoggedIn = (req) => req.user ? !!req.user : false;

const checkUser = (req, res) => isLoggedIn(req) ? res.sendStatus(200) : res.sendStatus(404);

// This needs to handle login as well
const signUp = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.sendStatus(400);
  }
  let user = new User(req.body);
  user.save()
  .then((user) => {
    createSession(req, res, user._id);
  })
  .catch((error) => {
    console.log('signup:', error);
    res.sendStatus(400);
  });
};

const googleAuth = (req, res) => res.send(req.user._id);

// Add a way to validate user with google ID?
const associateUser = (req, res) => {
  res.send(200);
}

const logIn = (req, res) => req.user ? res.send(req.user._id) : res.sendStatus(404);

const logOut = (req, res) => {
  req.logout();
  req.session.destroy((error) => {
    if (error) { res.sendStatus(404); }
    res.sendStatus(200);
  });
};

const checkUserAuth = (req, res) => checkUser(req, res);

const testSession = (req, res) => {
  console.log(req.session);
  res.sendStatus(200);
};

module.exports = {
  signUp,
  googleAuth,
  associateUser,
  logIn,
  logOut,
  testSession,
  checkUserAuth
};