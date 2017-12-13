const complaintsDb = require('../db/complaintsDb');
const Complaint = require('mongoose').model('Complaint');

// To be done after starting to support user submissions
const addComplaint = (req, res) => res.sendStatus(200);

// Two factor checking, user shouldn't be able to do this front-end
// If they do manage to get this far, they are doubly blocked
const addComplaintReport = (req, res) => {
  let sub = req.body.sub.toLowerCase();
  let type = req.body.type.toLowerCase();
  let stopId = req.body.stop_id.toLowerCase();
  let routeId = req.body.route_id.toLowerCase();

  let createdAt = Date.now();

  complaintsDb.addComplaintReport(sub, type, stopId, routeId)
  .then((count) => {
    res.send({ count })
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404)
  });
};

// To be implemented, or does this even matter?
// Need to be able undo a complaint
const subtractComplaintReport = (req, res) => {
  res.sendStatus(200);
  // let sub = req.body.sub.toLowerCase();
  // let type = req.body.type.toLowerCase();
  // let stopId = req.body.stop_id.toLowerCase();
  // let routeId = req.body.route_id.toLowerCase();
  // let test = instance.subtractComplaintReport(type, stopId, routeId);
  // if (test !== false) {
  //   res.send({ count: test });
  // } else {
  //   res.sendStatus(400);
  // }
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

// Only need to check for user complaints if a user is logged in?
const getReportsByStopAndRoute = (req, res) => {
  let sub = req.query.sub.toLowerCase();
  let stopId = req.query.stop_id.toLowerCase();
  let routeId = req.query.route_id.toLowerCase();
  complaintsDb.getReportsByStopAndRoute(sub, stopId, routeId)
  .then((result) => res.send(result))
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const getTypeComplaintsByRoute = (req, res) => res.sendStatus(200);

const getTotalComplaintCounts = (req, res) => {
  res.sendStatus(200);
  // let sub = req.query.sub.toLowerCase();
  // let test = instance.getTotalComplaintCounts()
  // if (test) {
  //   res.send(test)
  // } else {
  //   res.sendStatus(404)
  // }
};

module.exports = {
  addComplaint,
  addComplaintReport,
  subtractComplaintReport,
  getComplaintReport,
  getReportsByStopAndRoute,
  getTypeComplaintsByRoute,
  getTotalComplaintCounts
};
