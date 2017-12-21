const mongoose = require('mongoose');
const passport = require('passport');
const { googleClientId, googleClientSecret } = require('../env/key');
const User = mongoose.model('User');
const Util = require('../util');

// This needs to handle login as well
const signUp = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.sendStatus(400);
  }
  let user = new User(req.body);
  user.save()
  .then((user) => {
    passport.authenticate('local')(req, res, () => res.redirect('/login'));
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

const checkUserAuth = (req, res) => Util.checkUser(req, res, () => res.sendStatus(200));

const testSession = (req, res) => {
  console.log(req.session);
  res.sendStatus(200);
};

const addFavorite = (req, res) => {
  let routeId = req.body.route_id;
  let stopId = req.body.stop_id;
  let stopName = req.body.stop_name;
  let _id = req.user;
  Util.checkUser(req, res, () => {
    User.findOne({ _id }, (err, user) => {
      if (err){ res.sendStatus(404)}
      user.addFavorite(routeId, stopId, stopName)
      .then(data => res.send(data))
      .catch(err => res.sendStatus(404))
    })
  })
}

const getFavorites = (req, res) => {
  let _id = req.user;
  Util.checkUser(req, res, () => {
    User.findOne({ _id }, (err, user) => {
      if (err){ res.sendStatus(404) }
      res.send(user.favorites)
    })
  })
}

const deleteFavorite = (req, res) => {
  let _id = req.user;
  let stopId = req.body.stop_id;
  Util.checkUser(req, res, () => {
    User.findOne({ _id }, (err, user) => {
      if (err) { res.sendStatus(404) }
      user.deleteFavorite(stopId)
      .then(data => res.send(data))
      .catch(err => res.sendStatus(404))
    })
  })
}

module.exports = {
  signUp,
  googleAuth,
  associateUser,
  logIn,
  logOut,
  testSession,
  checkUserAuth,
  addFavorite,
  getFavorites,
  deleteFavorite
};
