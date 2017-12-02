class Complaint {
  constructor(type) {
    this.type = type;
    this.reports = [];
  }
  
  /**
   * Increment report count by 1 and returns the new count.
   * If the report does not exist, it will create a new one, add it to the complaint's reports, and
   * return an initial count of 1
   * 
   * @param {*} stopId required param
   * @param {*} routeId required param
   */
  addReport(stopId, routeId) {
    let report = this.getReport(stopId, routeId);
    if (!report) { report = new Report(stopId, routeId); }
    return report ? report.add() : -1;
  }

  /**
   * Decrement report count by 1 to a minimum of zero, returning the new count.
   * If the report count hits 0, it will remove the report from the complaint's reports
   * 
   * @param {*} stopId required param
   * @param {*} routeId required param
   */
  subtractReport(stopId, routeId) {
    let report = this.getReport(stopId, routeId);
    return report ? report.subtract() : -1;
  }

  /**
   * Fetches a report(s) and returns an array, returning an empty array if the report(s) could not be found
   * 
   * @param {*} params object containing stopId and routeId. If an array is given, will fetch all results matching those fields
   * e.g. 
   * let param1 = { stopId: 101N, routeId: 1 }, param2 = {stopId: 101S, routeId: 1};
   * let params = [param1, param2];
   * getReport(params) -> [...results];
   * getReport(param1) -> [result];
   */
  getReport(params) {
    let result = [];
    if (Array.isArray(param)) {
      param.forEach((a) => {
        result.push(this.getReport(a));
      });
    } else {
      if (!params.stopId || params.routeId) { throw 'Invalid parameters'; }
      let report = this.reports.find((a) => a.stopId === param.stopId && a.routeId === param.routeId);
      if (report) { result.push(report); }
    }
    return result;
  }

};

class Report {
  constructor(stopId, routeId) {
    this.stopId = stopId.toUpperCase();
    this.routeId = routeId.toUpperCase();
    this.count = 0;
  }

  add() {
    this.count++;
    return this.count;
  }

  subtract() {
    if (this.count > 0) { this.count--; }
    return this.count;
  }
};

module.exports = {
  Complaint,
  Report
};