class Complaint {
  constructor(type) {
    this.type = type;
    this.reports = [];
  }
<<<<<<< HEAD
  
=======

>>>>>>> Functional Loco
  /**
   * Increment report count by 1 and returns the new count.
   * If the report does not exist, it will create a new one, add it to the complaint's reports, and
   * return an initial count of 1
<<<<<<< HEAD
   * 
=======
   *
>>>>>>> Functional Loco
   * @param {*} param required object containing stopId and routeId
   * e.g. { stopId: '101N', routeId: '1' }
   */
  addReport(param) {
    let report = this.getReport(param);
<<<<<<< HEAD
    if (!report) { 
      report = new Report(param.stopId, param.routeId); 
    }
    let result = report.add();
    this.reports.push(report);
=======
    if (!report) {
      report = new Report(param.stopId, param.routeId);
      this.reports.push(report);
    }
    let result = report.add();
>>>>>>> Functional Loco
    return result;
  }

  /**
   * Decrement report count by 1 to a minimum of zero, returning the new count, or -1 if not found
   * TBD: If the report hits 0, remove the report to stop tracking
<<<<<<< HEAD
   * 
=======
   *
>>>>>>> Functional Loco
   * @param {*} param required object containing stopId and routeId
   * e.g. { stopId: '101N', routeId: '1' }
   */
  subtractReport(param) {
    let report = this.getReport(param);

    // Not found
    if (!report) { return -1; }

    // Subtracted as normal
    let count = report.subtract();
    if (count > 0) { return count; }
  }

  /**
   * Fetches a report(s) and returns an array, returning an empty array if the report(s) could not be found
<<<<<<< HEAD
   * 
   * @param {*} reports object or array of objects containing stopId and routeId. If an array is given, this 
   * will fetch all results matching those fields
   * 
   * e.g. 
=======
   *
   * @param {*} reports object or array of objects containing stopId and routeId. If an array is given, this
   * will fetch all results matching those fields
   *
   * e.g.
>>>>>>> Functional Loco
   * let complaint = new Complaint();
   * let param1 = { stopId: '101N', routeId: '1' };
   * let param2 = { stopId: '101S', routeId: '1' };
   * let params = [param1, param2];
   * complaint.getReport(params) -> [...results];
   * complaint.getReport(param1) -> [result];
   */
  getReport(params) {
    if (Array.isArray(params)) {
      let result = []
      params.forEach((param) => {
        result.push(this.getReport(param));
      });
      return result;
    } else {
      if (!params.stopId || !params.routeId) { throw 'Invalid parameters'; }
<<<<<<< HEAD
      return this.reports.find((a) => a.stopId === params.stopId && a.routeId === params.routeId);
=======
      let stopId = params.stopId.toUpperCase();
      let routeId = params.routeId.toUpperCase();
      return this.reports.find((a) => a.stopId === stopId && a.routeId === routeId);
>>>>>>> Functional Loco
    }
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
<<<<<<< HEAD
};
=======
};
>>>>>>> Functional Loco
