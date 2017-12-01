const protoParser = require('../lib/proto');
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

module.exports = {
  testProto,
  testService
};