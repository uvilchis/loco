const mongoose = require('mongoose');
const UserSchema = require('../models/user');
const ComplaintSchema = require('../models/complaint');

const DB_CREDENTIALS = require('../env/key.js').mongo_creds;

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('mongo loaded'));

mongoose.Promise = global.Promise;
mongoose.connect(DB_CREDENTIALS);

module.exports = {
  mongoose,
  db
};