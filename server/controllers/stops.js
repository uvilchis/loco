const axios = require('axios');

const env = require('../env');

const instance = axios.create({
  baseUrl: 'http://ec2-18-221-253-159.us-east-2.compute.amazonaws.com'
});

const getStops = (req, res) => {
  instance.get('/loco/stops', {
    params: {
      sub: 'mta'
    }
  })
  .then(({ data }) => res.send(data))
  .catch((error) => {
    console.log(error);
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

module.exports = {
  getStops,
  getStop
};
