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

// Test endpoints
router.get('/api/test/proto', controller.test.testProto);
router.get('/api/test/service', controller.test.testService);
router.get('/api/init', env.initialize) // testing env

module.exports = {
  router
};