const redis = require('redis');
const client = redis.createClient();

client.on('ready', () => console.log('redis loaded'));
client.on('error', (error) => console.log('redis error:', error));

/* Constants */

const REPORTS = 'reports';

/* Helper functions */

const _checkMems = (memStr, params = []) => params.reduce((acc, b) => {
  if (!acc) { return acc; }
  return acc = memStr.includes(b);
}, true);

const _mapPromise = (tasks) => Promise.all(tasks.map((task) => new Promise(task)));

/**
 * Cleaner helper method, runs after the current members are gathered. 
 * Will clean up old complaint reports, as well as empty members in reports
 */
const _cleaner = () => client.smembers(REPORTS, (error, members) => {
  let time = Date.now();
  setTimeout(_cleaner, 1000 * 60);
  members.forEach((mem) => {
    client.zremrangebyscore(mem, '-inf', Date.now() - (1000 * 60 * 30), (error, result) => {
      if (error) { throw `failed to clean ${mem} sorted set`; }
      client.zcount(mem, '-inf', 'inf', (error, result) => {
        if (error) { throw `failed to count ${mem} set`; }
        if (result === 0) {
          client.srem(REPORTS, mem, (error, result) => {
            if (error) { throw `failed to clean ${REPORTS} set`; }
          });
        }
      });
    });
  });
  console.log('cleaned');
});

// Initialize cleaner
_cleaner();

// Gross
const addComplaintReport = (sub, type, stopId, routeId) => new Promise((resolve, reject) => {
  let name = `${sub}-${type}-${stopId}-${routeId}`;
  client.sadd(REPORTS, name, (error, result) => {
    if (error) { return reject(error); }
    client.zadd(name, Date.now(), Date.now(), (error, result) => {
      if (error) { return reject(error); }
      client.zcount(name, '0', 'inf', (error, result) => {
        if (error) { return reject(error); }
        resolve(result);
      });
    });
  });
});

/**
 * Get complaint report for a certain type, stopId, and routeId
 */
const getComplaintReport = (sub, type, stopId, routeId) => new Promise((resolve, reject) => {
  let name = `${sub}-${type}-${stopId}-${routeId}`;
  client.sismember(REPORTS, name, (error, result) => {
    if (error) { return reject(0); }
    if (result === 0) { return resolve(result); }
    client.zcount(name, 0, 'inf', (error, result) => {
      if (error) { return reject(error); }
      resolve(result);
    });
  });
});

/**
 * Get all available complaint reports at a certain stopId and routeId
 */
const getReportsByStopAndRoute = (sub, stopId, routeId) => new Promise((resolve, reject) => {
  client.smembers(REPORTS, (error, members) => {
    members = members.filter((member) => _checkMems(member, [sub, stopId, routeId]))
      .map((name) => (cb) => client.zcount(name, 0, 'inf', (error, count) => cb({ name: name.split('-')[1], count })));
    _mapPromise(members).then((result) => resolve(result));
  });
});

const checkComplaintExists = (sub, type, stopId, routeId) => new Promise((resolve, reject) => {
  let name = `${sub}-${type}-${stopId}-${routeId}`;
  client.sismember(REPORTS, name, (error, result) => {
    if (error) { return reject(error); }
    resolve(!!result);
  });
});

const removeComplaintReport = (sub, type, stopId, routeId) => new Promise((resolve, reject) => {
  let name = `${sub}-${type}-${stopId}-${routeId}`;
  
});

module.exports = {
  addComplaintReport,
  getComplaintReport,
  getReportsByStopAndRoute,
  checkComplaintExists
};