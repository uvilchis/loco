const mongoose = require('mongoose');
const passport = require('passport');
const { googleClientId, googleClientSecret } = require('../env/key');
const User = mongoose.model('User');

const isLoggedIn = (req) => req.user ? !!req.user : false;

const checkUser = (req, res) => {
  isLoggedIn(req) ? createSession(req, res, req.user) : res.sendStatus(404);
};

const createSession = (req, res, newUser) => req.session.regenerate(() => {
  req.session.user = newUser; // Actually the _ids
  res.send(req.session.user);
});

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

const googleAuth = (req, res) => {
  console.log('auth', req.user._id);
  res.send(req.user._id); // need to decide whether or not we need this
};

// Add a way to validate user with google ID?
const associateUser = (req, res) => {
  res.send(200);
}

const logIn = (req, res) => {
  let user;
  User.findOne({ username: req.body.username }).exec()
  .then((userDoc) => userDoc.comparePassword(req.body.password))
  .then((user) => {
    return matched[0] ? createSession(req, res, user) : res.sendStatus(403);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(403);
  });
};

const logOut = (req, res) => {
  req.logout();
  res.send(200);
};

const checkUserAuth = (req, res) => {
  checkUser(req, res);
};

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