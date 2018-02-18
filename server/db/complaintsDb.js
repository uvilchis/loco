const redis = require('redis');
const client = redis.createClient();
client.on('ready', () => console.log('redis loaded'));
client.on('error', (error) => console.log('redis error:', error));

/*
  Redis keeps track of complaints removing any that are older than 30 minutes. 
  Using the DB will typically require a sub, complaint type, stop ID, and route ID. 
  Some queries will only require some of those params

  e.g.
    sub = 'mta';
    type = 'delay';
    stopId = '101N';
    routeId = '7';

  The data itself is organized as such:
    reports: Set -> names of current complaints
      * mta-delay-101n-7
      * mta-delay-102n-7
    
    mta-delay-101n-7: SortedSet -> time stamps of current complaints
      * 1234567: 1234567
      * 1234590: 1234590
  
  The second table (the one with time stamps) uses the time as score and value.
  When cleaning, we use the ZREMRANGEBYSCORE to simply remove all the complaints older than 30 minutes
*/

/* Constants */

const REPORTS = 'reports';

/* Helper functions */

/**
 * Takes in a string and returns whether or not that string contains all intended params
 * 
 * e.g.
 *   _checkMems('abc 123 efg', ['abc', '123', 'efg']) === true;
 *   _checkMems('abc 123 efg', ['abc', '123', 'not-in-str']) === false;
 * @param {string} memStr String to check for params
 * @param {string[]} params Desired values within string
 */
const _checkMems = (memStr, params = []) => params.reduce((acc, b) => {
  if (!acc) { return acc; }
  return acc = memStr.includes(b);
}, true);



/**
 * Takes an array of asynchronous functions, and returns a Promise tha resolves will an array of results
 * 
 * @param {function[]} tasks 
 */
const _mapPromise = (tasks) => Promise.all(tasks.map((task) => new Promise(task))).catch((error) => console.log(error));

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
});

// Initialize cleaner
_cleaner();


/* Actual methods */

/**
 * Add a new complaint to the db. Needs all 4 params.
 * Returns a Promise that resolves with new complaint count
 * 
 * @param {string} sub transit authority e.g. 'mta'
 * @param {string} type type of complaint e.g. 'delay'
 * @param {string} stopId id of stop e.g. '101n';
 * @param {string} routeId id of route e.g. '7';
 */
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
 * See complaint counts for a certain sub, type, stopId, and routeId
 * Returns a promise that resolves with the complain count
 * 
 * @param {string} sub transit authority e.g. 'mta'
 * @param {string} type type of complaint e.g. 'delay'
 * @param {string} stopId id of stop e.g. '101n';
 * @param {string} routeId id of route e.g. '7';
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
 * Fetch all reports at a specific sub, stop, and route
 * Returns a promise that resolves with an array showing all complaints
 * 
 * To clarify the map section...
 *   1. Members array is mapped into callbacks holding name as closure variable
 *   2. Each callback invokes the zcount method -> this is turned into promise by _mapPromise
 *   3. Zcount has its own callback that requires the above callback variables
 * 
 * @param {*} sub transit authority e.g. 'mta'
 * @param {*} stopId id of stop e.g. '101n';
 * @param {*} routeId id of route e.g.'7';
 */
const getReportsByStopAndRoute = (sub, stopId, routeId) => new Promise((resolve, reject) => {
  client.smembers(REPORTS, (error, members) => {
    members = members.filter((member) => _checkMems(member, [sub, stopId, routeId]))
      .map((name) => (cb) => client.zcount(name, 0, 'inf', (error, count) => cb({ name: name.split('-')[1], count })));
    _mapPromise(members).then((result) => resolve(result));
  });
});



/**
 * Gets the grand total number of reports for any given route
 * Returns a promise that resolves with an array of all complaints
 * 
 * To clarify the map section...
 *   1. Members array is first filtered for the correct route ids
 *   2. Members array is then mapped into callbacks holding name as closure variable
 *   3. Each callback invokes zcount method -> this is turned into promise by _mapPromise
 *   4. Zcount has its own callback that requires the above callback variables
 * 
 * @param {*} sub transit authority e.g. 'mta'
 * @param {*} routeId id of route e.g. '7'
 */
const getReportsByRoute = (sub, routeId) => new Promise((resolve, reject) => {
  let complaints = [];
  client.smembers(REPORTS, (error, members) => {
    if (error) { reject(error) }
      members = members.filter((member) => member.split('-').pop() === routeId)
        .map((name) => (cb) => client.zcount(name, 0, 'inf', (error, count) => cb(complaints.push([name.replace(/-\w$/, ''), count]))));
    _mapPromise(members).then((result) => resolve(complaints));
  });
});



/**
 * Fetches every available complaint from the db at the time of invocation.
 * Returns a promise that resolves with an object with all the available complaints
 * 
 */

/*
const getAllComplaintCounts = () => new Promise((resolve, reject) => {
  let complaintCounts = {};
  client.smembers(REPORTS, (error, members) => {
    if (error) { reject(error) }
      members = members.map((name) => (cb) => client.zcount(name, 0, 'inf', (error, count) => cb(complaintCounts[name.slice(-1)] ? complaintCounts[name.slice(-1)]+=count : complaintCounts[name.slice(-1)] = count)));
    _mapPromise(members).then((result) => resolve(complaintCounts))
  });
});
*/


/**
 * Intended to fetch all the complaints a given user has made.
 * Not yet implemented, still deciding how to best track user ids
 */

/*
const checkComplaints = (sub, stopId, routeId, userId) => new Promise((resolve, reject) => {
  client.smembers(REPORTS, (error, members) => {
    members = members.filter((member) => _checkMems(member, [sub, stopId, routeId]))
      .map((name) => (cb) => client.zscore(name, userId, (error, result) => cb({ name: name, exists: result})));
    _mapPromise(members).then((result) => resolve(result));
  });
});
*/

module.exports = {
  addComplaintReport,
  getComplaintReport,
  getReportsByStopAndRoute,
  getAllComplaintCounts,
  getReportsByRoute
};
