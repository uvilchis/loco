const User = require('../../server/models/user')

describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User({ username: 'Test' });
  });

  it('should require a username', (done) => {
    let temp = new User();
    temp.validate((err1) => {
      expect(err1.errors.username).toBeTruthy();

      user.validate((err2) => {
        expect(err2).toBeFalsy();
        done();
      });
    });
  });

  it('should have an array of favorites', () => {
    expect(user.routes).toBeTruthy();
    expect(Array.isArray(user.routes)).toBe(true);
  });

  describe('method addFavorite', () => {

    beforeEach(() => {
      user.save = (err, b) => {

      };
    })

    it('should exist', () => {
      expect(user.addFavorite).toBeTruthy();
      user.save('1');
    });

    it('should require 3 parameters', () => {
      expect(user.addFavorite.length).toBeGreaterThanOrEqual(3);

    });
  });

  describe('method deleteFavorite', () => {
    it('should exist', () => {
      expect(user.addFavorite).toBeTruthy();

    });
  });

});