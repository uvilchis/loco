const env = require('../env');

const getStops = (req, res) => {
  res.send(env.storage.stops);
};

module.exports = {
  getStops
};