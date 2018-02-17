import moxios from 'moxios'

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const login = require('../../../client/actions/login');

describe('login actions', function() {
  
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  
  describe('logIn', () => {
    it('should return type LOG_IN', () => {
      let action = login.logIn();
      expect(action.type).toBe(login.LOG_IN);
    });
  });

  describe('logOut', () => {
    it('should return type LOG_OUT', () => {
      let action = login.logOut();
      expect(action.type).toBe(login.LOG_OUT);
    });
  });

  describe('tryLogIn', function() {
    it('should dispatch LOG_IN if successful', function() {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({ status: 200 });
      });

      let expectedActions = [{ type: login.LOG_IN }];
      let store = mockStore({ loggedIn: false });

      return store.dispatch(login.tryLogIn({
        username: 'TEST',
        password: 'TEST'
      })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});