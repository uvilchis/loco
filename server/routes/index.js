const router = require('express').Router();
const controller = require('../controllers');
const { checkUser } = require('../util');
const env = require('../env/index.js')

// router.use('/api/*', checkUser);

// User routes
router.post('/login', controller.users.authUser); // Login
router.post('/signup', controller.users.signUpUser); // Signup

// Stations
router.get('/api/stations', controller.stations.getStations);
router.get('/api/stations/:station', controller.stations.getStationSchedule);

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

// Test endpoints
router.get('/api/test/proto', controller.test.testProto);
router.get('/api/test/service', controller.test.testService);
router.get('/api/init', env.initialize) // testing env
router.get('/api/test/routes', controller.test.testRoutes);
router.get('/api/test/stoptimes', controller.test.testStopTimes);
router.get('/api/test/updatedb', controller.test.testUpdateDb);
router.get('/api/test/timesbystop', controller.test.testSchedByStop);
router.get('/api/test/timesbyroute', controller.test.testSchedByRoute);
router.get('/api/test/timesbyboth', controller.test.testSchedByStopRoute);

module.exports = {
  router
};
