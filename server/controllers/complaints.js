const instance = require('../instance');
const complaintsDb = require('../db/complaintsDb');

// To be done after starting to support user submissions
const addComplaint = (req, res) => {
  res.sendStatus(200);
};

const addComplaintReport = (req, res) => {
  let sub = req.body.sub.toLowerCase();
  let type = req.body.type.toLowerCase();
  let stopId = req.body.stop_id.toLowerCase();
  let routeId = req.body.route_id.toLowerCase();
  complaintsDb.addComplaintReport(sub, type, stopId, routeId)
  .then((result) => res.send({ count: result }))
  .catch((error) => {
    console.log(error);
    res.sendStatus(404)
  });
};

// To be implemented, or does this even matter?
const subtractComplaintReport = (req, res) => {
  let sub = req.body.sub.toLowerCase();
  let type = req.body.type.toLowerCase();
  let stopId = req.body.stop_id.toLowerCase();
  let routeId = req.body.route_id.toLowerCase();
  let test = instance.subtractComplaintReport(type, stopId, routeId);
  if (test !== false) {
    res.send({ count: test });
  } else {
    res.sendStatus(400);
  }
};

const getComplaintReport = (req, res) => {
  let sub = req.query.sub.toLowerCase();
  let type = req.query.type.toLowerCase();
  let stopId = req.query.stop_id.toLowerCase();
  let routeId = req.query.route_id.toLowerCase();
  complaintsDb.getComplaintReport(sub, type, stopId, routeId)
  .then((count) => res.send({ count }))
  .catch((error) => {
    console.log(error);
    res.sendStatus(404)
  });
};

const getTypeComplaintsByRoute = (req, res) => {
  let sub = req.query.sub.toLowerCase();
  let routeId = req.query.route_id.toLowerCase();
  let test = instance.getTypeComplaintsByRoute(routeId);
  if (test) {
    res.send(test);
  } else {
    res.sendStatus(404)
  }
}

const getTotalComplaintCounts = (req, res) => {
  let sub = req.query.sub.tolowerCase();
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
