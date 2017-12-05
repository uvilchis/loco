const { key } = require('./key.js');

const URLS = {
  SERVICE: 'http://web.mta.info/status/serviceStatus.txt',
  RT_MAIN: `http://datamine.mta.info/mta_esi.php?key=${key}&feed_id=1`,
  RT_YELLOW: `http://datamine.mta.info/mta_esi.php?key=${key}&feed_id=26`
};

module.exports = {
  URLS
};