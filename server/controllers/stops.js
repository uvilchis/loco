const axios = require('axios');
const geodist = require('geodist');
const db = require('../db/mtaSched')

const env = require('../env');

const instance = axios.create({
  baseURL: 'http://ec2-18-221-253-159.us-east-2.compute.amazonaws.com'
});

const getStops = (req, res) => {
  instance.get('/loco/stops', {
    params: {
      sub: 'mta'
    }
  })
  .then(({ data }) => res.send(data))
  .catch((error) => {
    res.sendStatus(404);
  });
};

const getStop = (req, res) => {
  let stopId = req.query.stop_id;
  instance.get('/loco/stop', {
    params: {
      sub: 'mta',
      stop_id: stopId
    }
  })
  .then(({ data }) => res.send(data))
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const testStops = (req, res) => {
  db.getStopsByCoords()
  .then((data) => {
    let stations = [];
    for (var i = 0; i < data.length; i++) {
      let currentLat = Number(data[i].stop_lat);
      let currentLon = Number(data[i].stop_lon);
      var distance = geodist({lat: req.query.lat, lon: req.query.lon}, {lat: currentLat, lon: currentLon}, {exact: true, unit: 'miles'})
      if (distance <= 0.25) {
        stations.push(data[i])
      }
    }
    console.log(stations.length)
    res.send(stations)
  })
  .catch((error) => {
    res.sendStatus(404);
  })
};

module.exports = {
  getStops,
  getStop,
  testStops
};
