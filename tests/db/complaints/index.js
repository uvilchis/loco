import {
  client,
  REPORTS,
  addReport,
  getReport,
  getReportsByRoute,
  getReportsByStopAndRoute
} from '../../../server/db/reportsDb';

describe('reportDb', () => {

  beforeAll((done) => {
    client.on('ready', () => {
      if (client.selected_db !== 5) {
        throw `client not connected to designated test ID 5, instead connected to ${client.connection_id}`
      }
      client.dbsize((size) => {
        if (size > 0) { throw 'test db not empty!!'; }
        client.flushdb();
        done();
      });
    });
  });

  afterEach((done) => client.flushdb(done));

  it('should handle adding a new report to the db', () => {
    let testParams = ['test', 'delayed', '123', 'a'];
    return addReport(...testParams)
    .then((count) => {
      expect(count).toBe(1); // Should return the new count
    });
  });

  /**
   * There's a problem with the test, due to the cleaner setup
   * Test will only work ~75% of the time. Defer to postman for this test to work properly
   */
  xit('should increment current report count by 1 if it already exists', () => {
    let testParams = ['test', 'delayed', '123', 'a'];
    return addReport(...testParams)
    .then(() => addReport(...testParams))
    .then((count) => {
      expect(count).toBe(2);
    });
  });

  it('should handle adding to the reports set when adding a complaint', (done) => {
    let testParams = ['test', 'delayed', '123', 'a'];
    addReport(...testParams)
    .then((count) => {
      client.scan('0', (error, keys) => {
        expect(keys[1].length).toBe(2); // 1 for addReport, 1 for reports table
        client.smembers(REPORTS, (error, keys) => {
          expect(keys).toContain(testParams.join('-'));
          done();
        });
      });
    });
  });

  it('should be able to get a specific report', () => {
    let testParams = ['test', 'delayed', '123', 'a'];
    return addReport(...testParams)
    .then(() => getReport(...testParams))
    .then((count) => {
      expect(count).toBe(1);
    });
  });

  it('should be able to get all reports by sub, stop, and route', () => {
    let firstTest = ['test', 'delayed', '123', 'a'];
    let secondTest = ['test', 'crowded', '123', 'a'];
    let searchParams = ['test', '123', 'a'];
    let expected = [
      { type: 'crowded', count: 1 },
      { type: 'delayed', count: 1 }
    ];

    return addReport(...firstTest)
    .then(() => addReport(...secondTest))
    .then(() => getReportsByStopAndRoute(...searchParams))
    .then((result) => {
      // While we may not care about order in use, it's important for testing
      result.sort((a, b) => a.name > b.name);
      expect(result).toEqual(expected);
    });
  });

  it('should be able to get all reports on a route', () => {
    let firstTest = ['test', 'delayed', '123', 'a'];
    let secondTest = ['test', 'crowded', '123', 'a'];
    let searchParams = ['test', 'a'];
    let expected = [
      { type: 'crowded', stopId: '123', count: 1 },
      { type: 'delayed', stopId: '123', count: 1 }
    ];

    return addReport(...firstTest)
    .then(() => addReport(...secondTest))
    .then(() => getReportsByRoute(...searchParams))
    .then((result) => {
      // While we may not care about order in use, it's important for testing
      result.sort((a, b) => a.name > b.name);
      expect(result).toEqual(expected);
    });
  });

  // Testing will check for a time of 1 second, prod uses 30 minutes... may be a better way to test
  it('should be able to clean up old reports from both zset and sset', (done) => {
    let testParams = ['test', 'delayed', '123', 'a'];

    addReport(...testParams)
    .then((count) => {
      expect(count).toBe(1);
      setTimeout(() => {
        client.smembers(REPORTS, (error, keys) => {
          expect(keys).toEqual([]);
          done();
        });
      }, 2000)
    });
  });
});