const protoParser = require('../lib/proto');
const textParser = require('../lib/txt');
const db = require('../db/mtaSched');
const env = require('../env');
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
  db.getRoutes()
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const testStops = (req, res) => {
  db.getStops()
  .then((result) => {
    res.send(result);
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

const testUpdateDb = (req, res) => {
  db.updateMtaSchedule()
  .then((result) => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const testSchedByStop = (req, res) => {
  let stopId = req.query.stop_id;
  let routeType = req.query.route_type;
  db.getScheduleByStop(stopId, routeType)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  })
};

const testSchedByRoute = (req, res) => {
  let routeId = req.query.route_id;
  let routeType = req.query.route_type;
  db.getScheduleByRoute(routeId, routeType)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const testSchedByStopRoute = (req, res) => {
  let stopId = req.query.stop_id;
  let routeId = req.query.route_id;
  let routeType = req.query.route_type;
  db.getScheduleByStopAndRoute(stopId, routeId, routeType)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  })
};

const testGetStops = (req, res) => {
  res.send(env.storage.stops);
}

module.exports = {
  testProto,
  testService,
  testRoutes,
  testStops,
  testStopTimes,
  testUpdateDb,
  testSchedByStop,
  testSchedByRoute,
  testSchedByStopRoute
};
