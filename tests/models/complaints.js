// Models
var complaints = require('../../server/models/complaint');
var Complaint = complaints.Complaint;
var Report = complaints.Report;

describe('Complaints/Reports', function() {
  var complaint;
  var report;

  beforeEach(function() {
    complaint = new Complaint('delay');
    report = new Report('101N', '1');
  })

  it('should be able to create a new complaint with a string type', function() {
    var test = new Complaint('type');
    expect(test.type).to.equal('type');
    expect(test.reports).to.be.empty;
  });

  it('should be able to create a new report given stopId and routeId', function() {
    var test = new Report('101N', '1');
    expect(test.stopId).to.equal('101N');
    expect(test.routeId).to.equal('1');
    expect(test.count).to.equal(0);
  });

  it('should be able to add a new report to a complaint', function() {
    complaint.addReport(report);
    expect(complaint.reports.length).to.equal(1);
    expect(complaint.reports[0].stopId).to.equal('101N');
  });

  it('should be able to get a previously added report', function() {
    complaint.addReport(report);
    var test = complaint.getReport(report);
    expect(test.stopId).to.equal(report.stopId);
  });

  it('should be able to get an array of previously added reports', function() {
    var test = new Report('101S', '2');
    complaint.addReport(report);
    complaint.addReport(test);
    var results = complaint.getReport([report, test]);
    expect(results.length).to.equal(2);
    expect(results.find((a) => a.stopId === report.stopId)).to.exist;
    expect(results.find((a) => a.stopId === test.stopId)).to.exist;
  });

  it('should be able to increment a report in a complaint', function() {
    complaint.addReport(report);
    complaint.addReport(report);
    expect(complaint.reports.length).to.equal(1);
    expect(complaint.reports[0].count).to.equal(2);
  });

  it('should be able to decrement a report in a complaint but not below 0', function() {
    complaint.addReport(report);
    complaint.subtractReport(report);
    expect(complaint.reports[0].count).to.equal(0);
    complaint.subtractReport(report);
    expect(complaint.reports[0].count).to.equal(0);
  });
});