// const instance = require('../instance');
const axios = require('axios')

const instance = axios.create({
  baseURL : 'http://ec2-18-221-253-159.us-east-2.compute.amazonaws.com:3001'
})


const getServiceData = (req, res) => {
  instance.get('/loco/service', {
    params : { sub: 'mta'}
  })
  .then(response => {
    res.send(response.data)
  })
  .catch(err => res.sendStatus(404))
  // if (data) {
  //   res.send(data);
  // } else {
  //   res.sendStatus(404);
  // }
};

const getServiceRouteData = (req, res) => {
  let routeId = req.params.route_id;
  //let data = instance.getServiceRouteData(routeId);
  instance.get(`/loco/service/route`, {
    params : {
      sub: 'mta',
      route_id : `${routeId}`
    }
  })
  .then(response => {
    res.send(response.data)
  })
  .catch(err => {
    console.log('error', err.data)
  })
  // if (data) {
  //   res.send(data);
  // } else {
  //   res.sendStatus(404);
  // }
};

module.exports = {
  getServiceData,
  getServiceRouteData
};
