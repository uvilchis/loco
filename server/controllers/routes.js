const db = require('../db/mtaSched');

const getRoutes = (req, res) => {
  db.getRoutes()
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const getRoute = (req, res) => {
  let routeId = req.query.route_id;
  db.getRoute(routeId)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  })
}

const getStopsByRoute = (req, res) => {
  let routeId = req.query.route_id
  db.getStopsByRoute(routeId)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404)
  })
}

module.exports = {
  getRoutes,
  getRoute,
  getStopsByRoute
};
