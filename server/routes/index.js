const router = require('express').Router();
const controller = require('../controllers');
const { checkUser } = require('../util');
const env = require('../env/index.js')

var passport = null; // Skeevy, fix later

/* User Routes */
const setPassport = (passportInstance) => {
  passport = passportInstance;

  // Session
  router.get('/api/user/start', controller.users.checkUserAuth);

  // Google Auth
  router.get('/api/user/google', passport.authenticate('google', {
    approvalPrompt: 'force',
    scope: ['profile']
  }));
  router.get('/api/user/google/return', passport.authenticate('google'), controller.users.googleAuth);

  // Mobile OAuth
  router.get('/api/user/mobile/google', passport.authenticate('mobile-oauth'), controller.users.googleAuth);

  

  // Local Auth

  // Signup
  router.post('/api/user/signup', controller.users.signUp);

  // Local login
  router.post('/api/user/login', passport.authenticate('local'), controller.users.logIn);
  router.get('/api/user/logout', controller.users.logOut);
};



// Stops
  // All stops
router.get('/api/stops', controller.stops.getStops);

  // Stop by stop_id
  // e.g. /api/stop?stop_id=101N
router.get('/api/stop', controller.stops.getStop);



// Routes
  // All routes
router.get('/api/routes', controller.routes.getRoutes);

  // Route by route_id
  // e.g. /api/route?route_id=1
router.get('/api/route', controller.routes.getRoute);

router.get('/api/route/stops', controller.routes.getStopsByRoute);

// Stop_times - These will break if you call them without parameters
  // Params: stop_id, route_type
  // e.g. /api/times/stop?stop_id=101n&route_type=wkd
router.get('/api/times/stop', controller.times.schedByStop);

  // Params: route_id, route_type
  // e.g. /api/times/stop?route_id=1&route_type=wkd
router.get('/api/times/route', controller.times.schedByRoute);

  // Params: stop_id, route_id, route_ty[e]
  // e.g. /api/times/stop?stop_id=101n&route_id=1&route_type=wkd
router.get('/api/times/stoproute', controller.times.schedByStopRoute);



// Complaints - type refers to complaint type,
  // Params: type, stop_id, route_id
  // e.g. /api/complaint/stop?type=delay&stop_id=101N&route_id=1
// router.get('/api/complaint', controller.complaints.getComplaintReport);

// TODO: adding custom complaint
// router.post('/api/complaint/add', controller.complaints.addComplaint);


// Reports - type refers to complaint type, add and subtract return the new count
  // for returning a particular complaint at a particular stop
  // Params: type, stop_id, route_id
router.get('/api/report', controller.complaints.getComplaintReport);

// to be called when you've reached a train line's detail page, and have selected a route
// Params : sub, route_id
router.get('/api/report/stoproute', controller.complaints.getReportsByStopAndRoute);

router.get('/api/report/typecomplaintsbyroute', controller.complaints.getTypeComplaintsByRoute);

// to be called at the main page so users can see routes experiencing problems at a glance (no params)
router.get('/api/report/getallcomplaintcounts', controller.complaints.getAllComplaintCounts);

// TODO: this route will be tantamount to ensuring users know which stops are experiencing issues at the details page
router.get('/api/report/reports', controller.complaints.getReportsByRoute);

  // Params: type, stop_id, route_id
  // e.g. /api/report/add?type=delayed&stop_id=101N&route_id=1
router.post('/api/report/add', checkUser, controller.complaints.addComplaintReport);

  // Params: type, stop_id, route_id
  // e.g. /api/report/subtract?type=delay&stop_id=101N&route_id=1
router.post('/api/report/subtract', controller.complaints.subtractComplaintReport);



// Service data
  // Params: none, gets all service data
  // e.g. /api/service
router.get('/api/service', controller.realtime.getServiceData);

  // Params: route_id
  // e.g. /api/service/7
router.get('/api/service/:route_id', controller.realtime.getServiceRouteData);


/* To be fixed later */

// Test endpoints
// router.get('/api/test/proto', controller.test.testProto);
// router.get('/api/test/service', controller.test.testService);
// router.get('/api/test/routes', controller.test.testRoutes);
// router.get('/api/test/stops', controller.test.testStops);
// router.get('/api/test/stoptimes', controller.test.testStopTimes);
// router.get('/api/test/updatedb', controller.test.testUpdateDb); // This should probably be gated
// router.get('/api/test/timesbystop', controller.test.testSchedByStop);
// router.get('/api/test/timesbyroute', controller.test.testSchedByRoute);
// router.get('/api/test/timesbyboth', controller.test.testSchedByStopRoute);


// Session tester
// router.get('/api/test/session', controller.users.testSession);

module.exports = {
  router,
  setPassport
};
