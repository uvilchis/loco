const instance = require('../instance');

const getServiceData = (req, res) => {
  let data = instance.getServiceData();
  if (data) {
    res.send(data);
  } else {
    res.sendStatus(404);
  }
};

const getServiceRouteData = (req, res) => {
  let routeId = req.params.route_id;
  let data = instance.getServiceRouteData(routeId);
  if (data) {
    res.send(data);
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  getServiceData,
  getServiceRouteData
};