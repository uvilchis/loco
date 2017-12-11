const redis = require('redis');
const client = redis.createClient();

client.on('ready', () => console.log('redis loaded'));
client.on('error', (error) => console.log('redis error:', error));

const REPORTS = 'reports';

/**
 * Cleaner helper method, runs after the current members are gathered. This is to try and
 * cut down on the inconsistency of the gap of time between executions
 */
const _cleaner = () => {
  let time = Date.now();
  let searchables;
  client.smembers(REPORTS, (error, members) => {
    let time = Date.now();
    setTimeout(_cleaner, 1000 * 60);
    members.forEach((mem) => {
      client.zremrangebyscore(mem, '-inf', Date.now() - (1000 * 60 * 30), (error, result) => {
        if (error) { throw 'failed to clean'; }
        console.log('cleaned');
      });
    });
  });
};

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

const getCountsByRoute = (sub, routeId) => new Promise((resolve, reject) => {
  client.smembers(REPORTS, (error, members) => {
    members = members.filter((mem) => mem.includes(sub) && mem.includes(routeId));
    let count = 0;

  });
});

module.exports = {
  addComplaintReport,
  getComplaintReport
};