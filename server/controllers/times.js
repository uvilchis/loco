const db = require('../db/mtaSched');

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
  let routeType = req.query.route_type;
  db.getScheduleByStopAndRoute(stopId, routeId, routeType)
  .then((result) => {
    res.send(result);
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