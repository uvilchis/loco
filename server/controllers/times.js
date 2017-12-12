// const db = require('../db/mtaSched');
const axios = require('axios')
const instance = axios.create({
  baseURL : 'http://ec2-18-221-253-159.us-east-2.compute.amazonaws.com'
});

const schedByStop = (req, res) => {
  let stopId = req.query.stop_id;
  let routeType = req.query.route_type;
  db.getScheduleByStop(stopId, routeType)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const schedByRoute = (req, res) => {
  let routeId = req.query.route_id;
  let routeType = req.query.route_type;
  db.getScheduleByRoute(routeId, routeType)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const schedByStopRoute = (req, res) => {
  let stopId = req.query.stop_id;
  let routeId = req.query.route_id;
  //let routeType = req.query.route_type;  <== can be weekday, saturday or sunday
  // db.getScheduleByStopAndRoute(stopId, routeId, routeType)
  instance.get('/loco/times/stoproute?sub=mta', {
    params: {
      stop_id : stopId,
      route_id : routeId
    }
  })
  .then((result) => {
    res.send(result.data);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

module.exports = {
  schedByStop,
  schedByRoute,
  schedByStopRoute
};
