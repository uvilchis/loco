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
UserSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.hash(user.password, null, null, function(error, hash) {
    if (error) { return next(error); }
    user.password = hash;
    console.log(hash);
    next();
  });
});

UserSchema.methods.comparePassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (error, result) => {
      if (error) { return reject(error); }
      resolve(result);
    })
  });
}

mongoose.model('User', UserSchema);