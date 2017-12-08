const instance = require('../instance');

// To be done after starting to support user submissions
const addComplaint = (req, res) => {
  res.sendStatus(200);
};

const addComplaintReport = (req, res) => {
  let type = req.body.type.toLowerCase();
  let stopId = req.body.stop_id;
  let routeId = req.body.route_id;
  let test = instance.addComplaintReport(type, stopId, routeId);
  if (test !== false) {
    res.send({ count: test });
  } else {
    res.sendStatus(400);
  }
};

const subtractComplaintReport = (req, res) => {
  let type = req.body.type.toLowerCase();
  let stopId = req.body.stop_id;
  let routeId = req.body.route_id;
  let test = instance.subtractComplaintReport(type, stopId, routeId);
  if (test !== false) {
    res.send({ count: test });
  } else {
    res.sendStatus(400);
  }
};

const getComplaintReport = (req, res) => {
  let type = req.query.type.toLowerCase();
  let stopId = req.query.stop_id;
  let routeId = req.query.route_id;
  let test = instance.getComplaintReport(type, stopId, routeId);
  if (test) {
    res.send(test);
  } else {
    res.sendStatus(404);
  }
};

const getTypeComplaintsByRoute = (req, res) => {
  let routeId = req.query.route_id;
  let test = instance.getTypeComplaintsByRoute(routeId);
  if (test) {
    res.send(test);
  } else {
    res.sendStatus(404)
  }
}

const getTotalComplaintCounts = (req, res) => {
  let test = instance.getTotalComplaintCounts()
  if (test) {
    res.send(test)
  } else {
    res.sendStatus(404)
  }
}

module.exports = {
  addComplaint,
  addComplaintReport,
  subtractComplaintReport,
  getComplaintReport,
  getTypeComplaintsByRoute,
  getTotalComplaintCounts
};
