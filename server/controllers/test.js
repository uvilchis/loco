const protoParser = require('../lib/proto');
const textParser = require('../lib/txt');
const { fetchServiceStatus } = require('../lib/txt/service.js');

const testProto = (req, res) => {
  let decoder;
  protoParser.fetchMain()
  .then((decoded) => {
    res.send(decoded);
  })
  .catch((error) => {
    console.log(error);
    res.send(404);
  });
};

const testService = (req, res) => {
  fetchServiceStatus()
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const testRoutes = (req, res) => {
  textParser.getRoutes()
  .then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const testStopTimes = (req, res) => {
  textParser.getStopTimes()
  .then((data) => {
    let result = [];
    for (let i = 0; i < 20000; i++) {
      result.push(data[i]);
    }
    // filter by stop ID
    let stopIdFilter = result.filter((element) => {
      return element["stop_id"] === "127N"
    })
    // sort by increasing time
    let timeSort = stopIdFilter.sort((a,b) => {
      return (a["arrival_time"] < b["arrival_time"]) ? -1 : ((a["arrival_time"] > b["arrival_time"]) ? 1 : 0)
    })
    res.send(timeSort);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};


module.exports = {
  testProto,
  testService,
  testRoutes,
  testStopTimes
};
