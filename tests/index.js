function importTest(name, path) {
  describe(name, function() {
    require(path);
  });
};

describe('testSuite', function() {
  importTest('server models', './server/complaints');
});