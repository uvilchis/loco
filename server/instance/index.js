const Models = require('../models/complaint');
const Complaint = Models.Complaint;
const Report = Models.Report;

const _instance = {};

let initialized = false;

const initialize = () => {
  if (initialized) { return; }
  let complaintTypes = ['delayed', 'closed', 'accident', 'crowded'];
  _instance.complaints = complaintTypes.map((type) => new Complaint(type));
  console.log('initialized');
  initialized = true;
};

const addComplaintReport = (type, stopId, routeId) => {
  let complaint = _instance.complaints.find((a) => a.type === type);
  if (complaint) {
    let count = complaint.addReport({ stopId, routeId });
    return count < 0 ? false : count;
  } else {
    console.log('failed to find complaint', _instance.complaints);
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

module.exports = {
  initialize,
  addComplaintReport,
  subtractComplaintReport,
  getComplaintReport
};