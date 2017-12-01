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
    for (let i = 0; i < 1000; i++) {
      result.push(data[i]);
    }
    res.send(result);
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