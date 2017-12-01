const router = require('express').Router();
const controller = require('../controllers');
const { checkUser } = require('../util');

// router.use('/api/*', checkUser);

// User routes
router.post('/login', controller.users.authUser); // Login
router.post('/signup', controller.users.signUpUser); // Signup

// Stations
router.get('/api/stations', controller.stations.getStations);
router.get('/api/stations/:station', controller.stations.getStationSchedule);

// Test endpoints
router.get('/api/test/proto', controller.test.testProto);
router.get('/api/test/service', controller.test.testService);

module.exports = {
  router
};
