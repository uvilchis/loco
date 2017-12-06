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
  console.log(user);
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
      if (error) { return reject(error); }
      resolve([result, this]); // Lol
    })
  });
}

mongoose.model('User', UserSchema);