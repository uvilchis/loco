const getStations = (req, res) => {
  let result = {}; // This should return an array of all stations someday
  console.log('hello');
  res.send('hello');
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
