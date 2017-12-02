const instance = require('../instance');

const getServiceData = (req, res) => {
  let data = instance.getServiceData();
  if (data) {
    res.send(data);
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  getServiceData
};