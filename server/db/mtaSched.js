const mysql = require('mysql');
const textParser = require('../lib/txt');

const connection = mysql.createConnection({
  user: 'root',
  database: 'loco_mta'
});

connection.connect((error) => {
  if (error) { return console.log(error); }
  console.log(`connected with id ${connection.threadId}`);
});

const CREATE_TABLES = `
  CREATE TABLE stop_times (
    id int NOT NULL AUTO_INCREMENT,
    route_id varchar(10) NOT NULL,
    route_type varchar(10) NOT NULL,
    arrival_time varchar(20) NOT NULL,
    stop_id varchar(10) NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE TABLE stops (
    id int NOT NULL AUTO_INCREMENT,
    stop_id varchar(10) NOT NULL,
    stop_name varchar(50) NOT NULL,
    stop_lat varchar(20) NOT NULL,
    stop_lon varchar(20) NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE TABLE routes (
    id int NOT NULL AUTO_INCREMENT,
    route_id varchar(10) NOT NULL,
    route_desc varchar(2000) NOT NULL,
    PRIMARY KEY (id)
  )`;

const DROP_TABLE = 'DROP TABLE stop_times';

const INSERT_INTO_STOPTIMES = 'INSERT INTO stop_times (route_id, route_type, arrival_time, stop_id) VALUES ?';
const INSERT_INTO_STOPS = 'INSERT INTO stops (stop_id, stop_name, stop_lat, stop_lon) VALUES ?';

const _dropTable = () => new Promise((resolve, reject) => {
  connection.query(DROP_TABLE, (error, result) => {
    if (error) { return reject(error); }
    resolve(result);
  });
});

const _createTable = () => new Promise((resolve, reject) => {
  connection.query(CREATE_TABLES, (error, result) => {
    if (error) { return reject(error); }
    resolve(result);
  });
});

const _insertTable = (data) => new Promise((resolve, reject) => {
  let query = (data) => {
    let newData = data.splice(0, 10000);
    connection.query(INSERT_INTO_STOPTIMES, [newData], (error, result) => {
      if (error) { return reject(error); }
      if (data.length) { return query(data); }
      resolve(result);
    });
  }
  query(data);
});

const _insertStops = (data) => new Promise((resolve, reject) => {
  connection.query()
});

const updateMtaSchedule = () => new Promise((resolve, reject) => {
  let data;
  textParser.getStopTimes()
  .then((parsedData) => {
    if (!parsedData.length) { throw 'Error parsing stoptimes'; }
    data = parsedData;
    return _dropTable();
  })
  .then((result) => {
    return _createTable();
  })
  .then((result) => {
    return _insertStopTimes(data);
  })
  .then((result) => {
    console.log('successfully updated MTA schedule');
    resolve(result);
  })
  .catch((error) => {
    console.log(error)
    reject(error);
  });
});

const getScheduleByStop = (stopId, routeType = 'WKD') => new Promise((resolve, reject) => {
  let query = 'SELECT * FROM `stop_times` WHERE `stop_id` = ? AND `route_type` = ?';
  connection.query(query, [stopId, routeType], (error, result) => {
    if (error) { return reject(error); }
    resolve(result);
  });
});

const getScheduleByRoute = (routeId, routeType = 'WKD') => new Promise((resolve, reject) => {
  let query = 'SELECT * FROM `stop_times` WHERE `route_id` = ? AND `route_type` = ?';
  connection.query(query, [routeId, routeType], (error, result) => {
    if (error) { return reject(error); }
    resolve(result);
  });
});

const getScheduleByStopAndRoute = (stopId, routeId, routeType = 'WKD') => new Promise((resolve, reject) => {
  let query = 'SELECT * FROM `stop_times` WHERE `stop_id` = ? AND `route_id` = ? AND `route_type` = ?'
  connection.query(query, [stopId, routeId, routeType], (error, result) => {
    if (error) { return reject(error); }
    resolve(result);
  });
});

module.exports = {
  updateMtaSchedule,
  getScheduleByStop,
  getScheduleByRoute,
  getScheduleByStopAndRoute
};