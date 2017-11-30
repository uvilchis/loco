const mongoose = require('mongoose');
const User = mongoose.model('User');

const authUser = (req, res) => {
  User.findOne({ username: req.body.username }).exec()
  .then((user) => {
    return user.comparePassword(req.body.password);
  })
  .then((matched) => {
    res.sendStatus(matched ? 200 : 400);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(403);
  });
};

const signUpUser = (req, res) => {
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

module.exports = {
  authUser,
  signUpUser
};