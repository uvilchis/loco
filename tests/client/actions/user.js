import moxios from 'moxios'

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import * as userActions from '../../../client/actions/user';

describe('user actions', () => {
  
  beforeEach(() => moxios.install()); 
  afterEach(() => moxios.uninstall());
  
  describe('logInSuccess', () => {
    let action;
    beforeEach(() => action = userActions.logInSuccess());

    it('should return type LOG_IN_SUCCESS', () => {
      expect(action.type).toBe(userActions.LOG_IN_SUCCESS);
    });

    it('should have payload of true', () => {
      expect(action.loggedIn).toBe(true);
    });
  });

  describe('logOutSuccess', () => {
    let action;
    beforeEach(() => action = userActions.logOutSuccess());

    it('should return type LOG_OUT_SUCCESS', () => {
      expect(action.type).toBe(userActions.LOG_OUT_SUCCESS);
    });

    it('should have payload of false', () => {
      expect(action.loggedIn).toBe(false);
    });
  });
  
  describe('signUpSuccess', () => {
    let action;
    beforeEach(() => action = userActions.signUpSuccess());

    it('should return type SIGN_UP_SUCCESS', () => {
      expect(action.type).toBe(userActions.SIGN_UP_SUCCESS);
    });

    it('should have payload of true', () => {
      expect(action.loggedIn).toBe(true);
    });
  });

  describe('signUpFail', () => {
    let action;
    beforeEach(() => action = userActions.signUpFail());

    it('should return type CHECK_LOGGED_SUCCESS', () => {
      expect(action.type).toBe(userActions.SIGN_UP_FAIL);
    });

    it('should have payload of true', () => {
      expect(action.loggedIn).toBe(false);
    });
  });

  describe('checkLoggedSuccess', () => {
    let action;
    beforeEach(() => action = userActions.checkLoggedSuccess());

    it('should return type CHECK_LOGGED_SUCCESS', () => {
      expect(action.type).toBe(userActions.CHECK_LOGGED_SUCCESS);
    });

    it('should have payload of true', () => {
      expect(action.loggedIn).toBe(true);
    });
  });

  describe('checkLoggedFail', () => {
    let action;
    beforeEach(() => action = userActions.checkLoggedFail());

    it('should return type CHECK_LOGGED_SUCCESS', () => {
      expect(action.type).toBe(userActions.CHECK_LOGGED_FAIL);
    });

    it('should have payload of true', () => {
      expect(action.loggedIn).toBe(false);
    });
  });

  describe('logError', () => {
    let action;
    beforeEach(() => action = userActions.logError());

    it('should return type LOG_ERROR', () => {
      expect(action.type).toBe(userActions.LOG_ERROR);
    });

    it('should preserve the current loggedIn state', () => {
      let trueStore = mockStore({ loggedIn: true });
      trueStore.dispatch(userActions.logError());
      expect(trueStore.getState().loggedIn).toBe(true);

      let falseStore = mockStore({ loggedIn: false });
      falseStore.dispatch(userActions.logError());
      expect(falseStore.getState().loggedIn).toBe(false);
    });
  });

  describe('tryLogIn', () => {
    it('should dispatch LOG_IN_START then LOG_IN_SUCCESS if successful', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 200 }));

      let expectedActions = [
        { type: userActions.LOG_IN_START },
        { type: userActions.LOG_IN_SUCCESS, loggedIn: true }
      ];
      let store = mockStore({ loggedIn: false });
      let userObj = { username: 'working', password: 'account' };

      return store.dispatch(userActions.tryLogIn(userObj)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch LOG_ERROR if unsuccessful', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 401 }));
      let expectedActions = [
        { type: userActions.LOG_IN_START },
        { type: userActions.LOG_ERROR, loggedIn: false }
      ];
      let store = mockStore({ loggedIn: false });
      let userObj = { username: 'broken', password: 'account' };

      return store.dispatch(userActions.tryLogIn(userObj)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('tryLogOut', () => {
    it('should dispatch LOG_OUT_START then LOG_OUT_SUCCESS if successful', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 200 }));
      let expectedActions = [
        { type: userActions.LOG_OUT_START },
        { type: userActions.LOG_OUT_SUCCESS, loggedIn: false }
      ];
      let store = mockStore({ loggedIn: true });

      return store.dispatch(userActions.tryLogOut()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch LOG_ERROR if unsuccessful', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 401 }));
      let expectedActions = [
        { type: userActions.LOG_OUT_START },
        { type: userActions.LOG_ERROR, loggedIn: true }
      ];
      let store = mockStore({ loggedIn: true });

      return store.dispatch(userActions.tryLogOut()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('trySignUp', () => {
    it('should dispatch SIGN_UP_START then SIGN_UP_SUCCESS if successful', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 200 }));
      let expectedActions = [
        { type: userActions.SIGN_UP_START },
        { type: userActions.SIGN_UP_SUCCESS, loggedIn: true }
      ];
      let store = mockStore({ loggedIn: true });
      let userObj = { username: 'working', password: 'account' };

      return store.dispatch(userActions.trySignUp(userObj)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch SIGN_UP_START then SIGN_UP_FAIL if unsuccessful', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 401 }));
      let expectedActions = [
        { type: userActions.SIGN_UP_START },
        { type: userActions.SIGN_UP_FAIL, loggedIn: false }
      ];
      let store = mockStore({ loggedIn: true });
      let userObj = { username: 'broken', password: 'account'}

      return store.dispatch(userActions.trySignUp(userObj)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('checkLogged', () => {
    it('should dispatch CHECK_LOGGED_START then CHECK_LOGGED_SUCCESS if successful', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 200 }));
      let expectedActions = [
        { type: userActions.CHECK_LOGGED_START },
        { type: userActions.CHECK_LOGGED_SUCCESS, loggedIn: true }
      ];
      let store = mockStore({ loggedIn: false });

      return store.dispatch(userActions.checkLogged()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch CHECK_LOGGED_START then CHECK_LOGGED_FAIL if unsuccessful', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 401 }));
      let expectedActions = [
        { type: userActions.CHECK_LOGGED_START},
        { type: userActions.CHECK_LOGGED_FAIL, loggedIn: false },
      ];
      let store = mockStore({ loggedIn: false });
      
      return store.dispatch(userActions.checkLogged()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});