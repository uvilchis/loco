const textParser = require ('../lib/txt')

const getStations = (req, res) => {
  let result = {}; // This should return an array of all stations someday
  textParser.getStops()
  .then((data) => {
    console.log(data)
    res.send(data)
  })
  .catch((err) => {
    console.log(error);
    res.send(404)
  })
};

const getStationSchedule = (req, res) => {
  let stationId = req.params.stationId;
  let result = null; // Return the requested station schedule
  res.send(result);
};

module.exports = {
  getStations,
  getStationSchedule
};
