const mongoose = require('mongoose');
const passport = require('passport');
const { googleClientId, googleClientSecret } = require('../env/key');
const User = mongoose.model('User');

// const isLoggedIn = (req) => req.session ? !!req.session.user : false;

// const checkUser = (req, res) => {
//   isLoggedIn(req) ? createSession(req, res, req.session.user) : res.sendStatus(404);
// };

// const createSession = (req, res, newUser) => req.session.regenerate(() => {
//   req.session.user = newUser;
//   res.send({
//     username: newUser.username,
//     complaints: newUser.complaints,
//     stations: newUser.stations,
//     trains: newUser.trains
//   });
// });

// This needs to handle login as well
const signUp = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.sendStatus(400);
  }
  let user = new User(req.body);
  user.save()
  .then((result) => {
    console.log('successful');
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });
};

const googleAuth = (req, res) => {
  console.log(req.user.authId);
  res.send(req.user.authId); // need to decide whether or not we need this
};

// Add a way to validate user with google ID?
const associateUser = (req, res) => {
  res.send(200);
}

const logIn = (req, res) => {
  let user;
  User.findOne({ username: req.body.username }).exec()
  .then((userDoc) => {
    user = userDoc;
    return user.comparePassword(req.body.password);
  })
  .then((matched) => {
    return matched ? res.sendStatus(200) : res.sendStatus(403);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(403);
  });
};

const logOut = (req, res) => {
  res.send(200);
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
  testSession
};