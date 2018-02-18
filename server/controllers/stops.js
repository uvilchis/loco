const axios = require('axios');

const env = require('../env');

const instance = axios.create({
  baseURL: 'http://ec2-18-221-253-159.us-east-2.compute.amazonaws.com'
});

const getStops = (req, res) => {
  instance.get('/loco/stops?sub=mta')
  .then(({ data }) => res.send(data))
  .catch((error) => {
    res.sendStatus(404);
  });
};

const testStops = (req, res) => {
  let sub = req.query.sub;
  let lat = req.query.lat;
  let lon = req.query.lon;
  instance.get(`/loco/stop/coords`, {
    params: {
      sub,
      lat,
      lon
    }
  })
  .then(({ data }) => res.send(data))
  .catch((error) => {
    res.sendStatus(404);
  })
};

module.exports = {
  getStops,
  testStops
};