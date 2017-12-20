const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
  authId: {
    type: String,
    unique: true
  },

  username: {
    type: String,
    unique: true
  },

  password: {
    type: String,
  },

  routes: {
    type: Array,
    default: []
  },

  stops: {
    type: Array,
    default: []
  },

  favorites: {
    type: Array,
    default: []
  },

  complaints: {
    type: Array,
    default: []
  }
});

// Change this to arrows?
// TODO: This needs to be made more robust
UserSchema.pre('save', function(next) {
  let user = this;
  if (!user.authId) { user.authId = user.username; }
  if (!user.isModified('password')) { return next(); }
  bcrypt.hash(user.password, null, null, function(error, hash) {
    if (error) { return next(error); }
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (error, result) => {
      if (error || !result) { return reject(error || result); }
      resolve(this);
    });
  });
};

UserSchema.methods.addFavorite = function(routeId, stopId, stopName) {
  return new Promise ((resolve, reject) => {
    let user = this;
    user.favorites.push({route_id : routeId, stop_id : stopId, stop_name: stopName})
    user.save(function (err, product) {
      if (err) { return reject (err) }
      resolve (product)
    })
  });
};

mongoose.model('User', UserSchema);
