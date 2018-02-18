import moxios from 'moxios';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import * as apiActions from '../../../client/actions/api';
import mockRoutes from '../shared/mock-routes.json';
import mockService from '../shared/mock-service.json';
import organizedRoutes from '../shared/organized-routes.json';

import * as util from '../../../client/lib/util';

describe('api actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ routes: [], service: [], organized: {} });
    moxios.install()
  });
  afterEach(() => moxios.uninstall());

  describe('getRoutes', () => {
    it('should return GET_ROUTES_START then GET_ROUTES_SUCCESS, if successful', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 200, response: mockRoutes }));

      let expectedActions = [
        { type: apiActions.GET_ROUTES_START },
        { type: apiActions.GET_ROUTES_SUCCESS, routes: mockRoutes }
      ];
      
      return store.dispatch(apiActions.getRoutes()).then(() => {
        // TODO: checks if actions has the desired routes... consider separating?
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should return GET_ROUTES_START then GET_ROUTES_FAIL', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 400 }));

      let expectedActions = [
        { type: apiActions.GET_ROUTES_START },
        { type: apiActions.GET_ROUTES_FAIL }
      ];

      return store.dispatch(apiActions.getRoutes()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getService', () => {
    it('should return GET_SERVICE_START then GET_SERVICE_SUCCESS, if successful', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 200, response: mockService }));

      let expectedActions = [
        { type: apiActions.GET_SERVICE_START },
        { type: apiActions.GET_SERVICE_SUCCESS, service: mockService }
      ];

      return store.dispatch(apiActions.getService()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should return GET_SERVICE_START then GET_SERVICE_FAIL', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 400 }));

      let expectedActions = [
        { type: apiActions.GET_SERVICE_START },
        { type: apiActions.GET_SERVICE_FAIL }
      ];

      return store.dispatch(apiActions.getService()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getRoutesAndService', () => {
    it('should dispatch getRoutes, then getService, then GET_ROUTES_AND_SERVICE_SUCCESS if successful', () => {
      moxios.stubRequest('/api/routes?sub=mta', { status: 200, response: mockRoutes });
      moxios.stubRequest('/api/service?sub=mta', { status: 200, response: mockService });

      let expectedActions = [
        { type: apiActions.GET_ROUTES_START },
        { type: apiActions.GET_ROUTES_SUCCESS, routes: mockRoutes },
        { type: apiActions.GET_SERVICE_START },
        { type: apiActions.GET_SERVICE_SUCCESS, service: mockService },
        // Organizer needs two arrays to reduce down to a data object, this is not an option here
        { type: apiActions.ORGANIZE_ROUTES_SUCCESS, organized: {} }
      ];

      return store.dispatch(apiActions.getRoutesAndService()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
    });
  });
});