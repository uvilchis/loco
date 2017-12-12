// const instance = require('../instance');
const axios = require('axios')

const instance = axios.create({
  baseURL : 'http://ec2-18-221-253-159.us-east-2.compute.amazonaws.com'
});


const getServiceData = (req, res) => {
  let sub = req.query.sub;
  instance.get('/loco/service', {
    params : { sub }
  })
  .then((response) =>  res.send(response.data))
  .catch((error) => {
    console.log(error);
    res.sendStatus(404)
  });
};

const getServiceRouteData = (req, res) => {
  let sub = req.query.sub;
  let routeId = req.params.route_id;
  instance.get(`/loco/service/route`, {
    params : {
      sub: 'mta',
      route_id : routeId
    }
  })
  .then((response) => res.send(response.data))
  .catch((error) => {
    console.log('error', error.data);
    res.sendStatus(404);
  });
};

module.exports = {
  getServiceData,
  getServiceRouteData
};
