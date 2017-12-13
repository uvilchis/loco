// const db = require('../db/mtaSched');
// THIS IS WHERE WE CAN QUERY FOR EXPRESS ROUTES SHOULD WE NEED THEM
const axios = require('axios')
const util = require('../lib/util.js')

const instance = axios.create({
  baseURL: 'http://ec2-18-221-253-159.us-east-2.compute.amazonaws.com'
});

const getRoutes = (req, res) => {
  instance.get('/loco/routes?sub=mta')
  .then(({ data }) => res.send(data))
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const getRoute = (req, res) => {
  let routeId = req.query.route_id;
  db.getRoute(routeId)
  .then(({ data }) => res.send(result))
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const getStopsByRoute = (req, res) => {
  let routeId = req.query.route_id
  // db.getStopsByRoute(routeId)
  instance.get('/loco/stops/routes?sub=mta', {
    params: {
      route_id : routeId
    }
  })
  .then(({ data }) => res.send(util.directionSort(data)))
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

module.exports = {
  getRoutes,
  getRoute,
  getStopsByRoute
};
