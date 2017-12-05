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

const addComplaintReport = (type, stopId, routeId) => {
  let complaint = _instance.complaints.find((a) => a.type === type);
  if (complaint) {
    let count = complaint.addReport({ stopId, routeId });
    return count < 0 ? false : count;
  } else {
    return false;
  }
};

const subtractComplaintReport = (type, stopId, routeId) => {
  let complaint = _instance.complaints.find((a) => a.type === type);
  if (complaint) {
    let count = complaint.subtractReport({ stopId, routeId });
    return count < 0 ? false: count; // Handle unfound report
  } else {
    return false;
  }
};

const getComplaintReport = (type, stopId, routeId) => {
  let complaint = _instance.complaints.find((a) => a.type === type);
  if (complaint) {
    return complaint.getReport({ stopId, routeId }); // Will send null if not found
  } else {
    return false;
  }
};

const getServiceData = () => {
  if (!_instance.serviceData) {
    return false;
  }
  return _instance.serviceData
};

module.exports = {
  initialize,
  addComplaintReport,
  subtractComplaintReport,
  getComplaintReport,
  getServiceData
};
