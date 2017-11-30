const textParser = require('../lib/txt/index.js')
const { key } = require('./key.js');
const dummydata = require('./dummydata.js');

const URLS = {
  SERVICE: 'http://web.mta.info/status/serviceStatus.txt',
  RT_MAIN: `http://datamine.mta.info/mta_esi.php?key=${key}&feed_id=1`,
  RT_YELLOW: `http://datamine.mta.info/mta_esi.php?key=${key}&feed_id=26`
};

var initialize = () => {
  const stops = textParser.getStops();
  const stopTimes = textParser.getStopTimes();
  // const routes = textParser.getRoutes();
  const storage = {}
  storage.stops = stops;
  storage.stopTimes = stopTimes;
  storage.dummydata = dummydata;
}

module.exports = {
  URLS
}