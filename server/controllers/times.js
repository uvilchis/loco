const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://ec2-18-221-253-159.us-east-2.compute.amazonaws.com'
});

const schedByStop = (req, res) => {
  let sub = req.query.sub.toLowerCase();
  let stopId = req.query.stop_id.toLowerCase();
  // let routeType = req.query.route_type.toLowerCase();
  // db.getScheduleByStop(stopId, routeType)
  instance.get('/loco/times/stop', {
    params: {
      sub,
      stop_id: stopId
    }
  })
  .then(({ data }) => res.send(data))
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const schedByRoute = (req, res) => {
  let sub = req.query.sub.toLowerCase();
  let routeId = req.query.route_id.toLowerCase();
  // let routeType = req.query.route_type.toLowerCase();
  // db.getScheduleByRoute(routeId, routeType)
  instance.get('/loco/times/route', {
    params: {
      sub,
      route_id: routeId
    }
  })
  .then(({ data }) => res.send(data))
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const schedByStopRoute = (req, res) => {
  let sub = req.query.sub.toLowerCase();
  let stopId = req.query.stop_id.toLowerCase();
  let routeId = req.query.route_id.toLowerCase();
  //let routeType = req.query.route_type;  <== can be weekday, saturday or sunday
  instance.get('/loco/times/stoproute', {
    params: {
      sub,
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
