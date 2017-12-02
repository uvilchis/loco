const Models = require('../models/complaint');
const Complaint = Models.Complaint;
const Report = Models.Report;

const instance = {};

let initialized = false;

const initialize = () => {
  if (initialize) { return; }
  let complaintTypes = ['delayed', 'closed', 'accident', 'crowded'];
  instance.complaints = complaintTypes.map((type) => new Complaint(type));
};

module.exports = {
  instance,
  initialize
};