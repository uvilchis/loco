const reportsDb = require('../db/reportsDb');
// const Complaint = require('mongoose').model('Complaint');

// To be done after starting to support user submissions
// const addUser? = (req, res) => res.sendStatus(200);

// Two factor checking, user shouldn't be able to do this front-end
// If they do manage to get this far, they are doubly blocked
const addReport = (req, res) => {
  let sub = req.body.sub.toLowerCase();
  let type = req.body.type.toLowerCase();
  let stopId = req.body.stop_id.toLowerCase();
  let routeId = req.body.route_id.toLowerCase();

  let createdAt = Date.now();

  reportsDb.addReport(sub, type, stopId, routeId)
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
// const subtractComplaintReport = (req, res) => {
//   res.sendStatus(200);
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
// };

const getReport = (req, res) => {
  let sub = req.query.sub.toLowerCase();
  let type = req.query.type.toLowerCase();
  let stopId = req.query.stop_id.toLowerCase();
  let routeId = req.query.route_id.toLowerCase();
  reportsDb.getReport(sub, type, stopId, routeId)
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
  reportsDb.getReportsByStopAndRoute(sub, stopId, routeId)
  .then((result) => res.send(result))
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const getTypeComplaintsByRoute = (req, res) => res.sendStatus(200);

const getAllComplaintCounts = (req, res) => {
  reportsDb.getAllComplaintCounts()
  .then((result) => {
    res.send(result)
  })
  .catch((error) => {
    res.sendStatus(404)
  })
}

const getReportsByRoute = (req, res) => {
  let sub = req.query.sub.toLowerCase();
  let routeId = req.query.route_id.toLowerCase();
  reportsDb.getReportsByRoute(sub, routeId)
  .then((result) => {
    res.send(result)
  })
  .catch((error) => {
    res.sendStatus(404)
  })
}

module.exports = {
  addReport,
  getReport,
  getReportsByStopAndRoute,
  getReportsByRoute
};
