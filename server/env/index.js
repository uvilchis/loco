const { key } = require('./key.js');

const URLS = {
  SERVICE: 'http://web.mta.info/status/serviceStatus.txt',
  RT_MAIN: `http://datamine.mta.info/mta_esi.php?key=${key}&feed_id=1`,
  RT_YELLOW: `http://datamine.mta.info/mta_esi.php?key=${key}&feed_id=26`
};

const storage = {};

// To hold real-time data later
var initialize = () => {

  // textParser.getStops()
  // .then((stopsData) => {
  //   console.log('succeeded!')
  //   storage.stops = stopsData;
  // })
  // .catch((err) => {
  //   console.log('ERROR IN INIT IN ENV:', err);
  // })

  // textParser.getStopTimes()
  // .then((stopTimesDeets) => {
  //   console.log('succeeded!!')
  //   storage.stopTimes = stopTimesDeets
  // })
  // .catch((err) => {
  //   console.log('ERROR IN INIT IN ENV:', err);
  // })

  // textParser.getRoutes()
  // .then((routes) => {
  //   console.log('succeeded!!!')
  //   storage.routes = routes
  // })
  // .catch((err) => {
  //   console.log('ERROR IN INIT IN ENV:', err);
  // })
}

module.exports.URLS = URLS;
module.exports.initialize = initialize;
module.exports.storage = storage;