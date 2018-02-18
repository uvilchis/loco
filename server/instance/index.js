const { setTimeout } = require('timers');
const serviceParser = require('../lib/txt/service');
const Models = require('../models/complaint');
const Complaint = Models.Complaint;
const Report = Models.Report;

const _instance = {};

let initialized = false;

const initialize = () => {
  if (initialized) { return; }
  _serviceScheduler();
  let complaintTypes = ['delayed', 'closed', 'accident', 'crowded'];
  _instance.complaints = complaintTypes.map((type) => new Complaint(type));
  console.log('initialized');
  initialized = true;
};

const _serviceScheduler = () => {
  serviceParser.fetchServiceStatus()
  .then((serviceData) => {
    _instance.serviceData = serviceData;
    setTimeout(_serviceScheduler, 1000 * 60 * 5); // Fetch every 5 minutes
  })
  .catch((error) => console.log(error));
}

const addReport = (type, stopId, routeId) => {
  let complaint = _instance.complaints.find((a) => a.type === type);
  if (complaint) {
    let count = complaint.addReport({ stopId, routeId });
    return count;
  } else {
    return false;
  }
};

const subtractComplaintReport = (type, stopId, routeId) => {
  let complaint = _instance.complaints.find((a) => a.type === type);
  if (complaint) {
    let count = complaint.subtractReport({ stopId, routeId });
    return count < 0 ? false : count; // Handle unfound report
  } else {
    return false;
  }
};

const getReport = (type, stopId, routeId) => {
  let complaint = _instance.complaints.find((a) => a.type === type);
  if (complaint) {
    return complaint.getReport({ stopId, routeId }); // Will send null if not found
  } else {
    return false;
  }
};

//  gets all reports of a particular type by route (i.e. delayed, closed, accident, crowded)
// will become getTypeComplaintsByRoute
const getTypeComplaintsByRoute = (routeId) => {
  // return _instance.complaints.reduce((acc, complaint) => {
  //   acc[complaint.type] = complaint.getCountsByRoute({ sub, routeId });
  //   return acc;
  // }, {});
  let complaints = {}
  let delayed = _instance.complaints.find((a) => a.type === 'delayed')
  let closed = _instance.complaints.find((a) => a.type === 'closed')
  let accident = _instance.complaints.find((a) => a.type === 'accident')
  let crowded = _instance.complaints.find((a) => a.type === 'crowded')

  complaints.delayed = delayed.getTypeReportByRoute({routeId})
  complaints.closed = closed.getTypeReportByRoute({routeId})
  complaints.accident = accident.getTypeReportByRoute({routeId})
  complaints.crowded = crowded.getTypeReportByRoute({routeId})

  console.log('test', complaints)
  return complaints;
}

// 1) returns the total number of each complaint experienced by a route
// 2) also returns the TOTAL NUMBER OF ALL COMPLAINTS being experienced by route
const getTotalComplaintCounts = () => {
  let complaints = {};
  let delayed = _instance.complaints.find((a) => a.type === 'delayed')
  let closed = _instance.complaints.find((a) => a.type === 'closed')
  let accident = _instance.complaints.find((a) => a.type === 'accident')
  let crowded = _instance.complaints.find((a) => a.type === 'crowded')

  complaints.delayed = delayed.getCounts()
  complaints.closed = closed.getCounts()
  complaints.accident = accident.getCounts()
  complaints.crowded = crowded.getCounts()
  complaints.total = {}
  // JANKY MVP SOLUTION

  for (var type in complaints) {
    let complaintType = complaints[type]
    for (var route in complaintType){
      !complaints.total.hasOwnProperty(route) ?
      complaints.total[route] = complaintType[route] :
      complaints.total[route] += complaintType[route]
    }
  }

  for (var doubled in complaints.total) {
    complaints.total[doubled] = complaints.total[doubled]/2
  }

  return complaints;

}

const getServiceData = () => {
  if (!_instance.serviceData) { return false; }
  return _instance.serviceData
};

const getServiceRouteData = (routeId) => {
  if (!_instance.serviceData) { return false; }
  return _instance.serviceData.lines.find((a) => a.name.includes(routeId));
};

module.exports = {
  initialize,
  addReport,
  subtractComplaintReport,
  getReport,
  getServiceData,
  getServiceRouteData,
  getTypeComplaintsByRoute,
  getTotalComplaintCounts
};
