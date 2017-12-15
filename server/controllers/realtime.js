// const db = require('../instance');
const axios = require('axios')

const db = axios.create({
  baseURL: 'http://ec2-18-221-253-159.us-east-2.compute.amazonaws.com'
});


const getServiceData = (req, res) => {
  let sub = req.query.sub;
  db.get('/loco/service', {
    params : { sub }
  })
  .then(({ data }) =>  res.send(data))
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const getServiceRouteData = (req, res) => {
  let sub = req.query.sub;
  let routeId = req.params.route_id;
  db.get(`/loco/service/route`, {
    params : {
      sub: 'mta',
      route_id : routeId
    }
  })
  .then(( {data }) => res.send(data))
  .catch((error) => {
    console.log('error', error.data);
    res.sendStatus(404);
  });
};

module.exports = {
  getServiceData,
  getServiceRouteData
};
