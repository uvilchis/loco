const env = require('../env');
const db = require('../db/mtaSched');

const getStops = (req, res) => {
  db.getStops()
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const getStop = (req, res) => {
  let stopId = req.query.stop_id;
  db.getStop(stopid)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

module.exports = {
  getStops,
  getStop
};
