import apiReducer from '../../../client/reducers/api';
import {
  GET_ROUTES_SUCCESS,
  // GET_ROUTES_FAIL,
  GET_SERVICE_SUCCESS,
  // GET_SERVICE_FAIL,
  ORGANIZE_ROUTES_SUCCESS,
  // ORGANIZE_ROUTES_FAIL,
  GET_STOPS_SUCCESS,
  // GET_STOPS_FAIL
} from '../../../client/actions/api';

import mockService from '../shared/mock-service.json';
import mockRoutes from '../shared/mock-routes.json';
import organizedRoutes from '../shared/organized-routes.json';

describe('apiReducers', () => {
  it('should have default state { routes: [], service: [], organized: {} }', () => {
    let reduced = apiReducer(undefined, 'invalid action');
    let expected = { routes: [], service: [], organized: {} };
    expect(reduced).toEqual(expected);
  });

  it('should accept GET_ROUTES_SUCCESS with expected payload', () => {
    let action = { type: GET_ROUTES_SUCCESS, routes: mockRoutes };
    let reduced = apiReducer(undefined, action);
    let expected = { routes: mockRoutes, service: [], organized: {} };
    expect(reduced).toEqual(expected);
  });

  it('should accept GET_SERVICE_SUCCESS with expected payload', () => {
    let action = { type: GET_SERVICE_SUCCESS, service: mockService };
    let reduced = apiReducer(undefined, action);
    let expected = { routes: [], service: mockService, organized: {} };
    expect(reduced).toEqual(expected);
  });

  it('should accept ORGANIZE_ROUTES_SUCCESS', () => {
    let action = { type: ORGANIZE_ROUTES_SUCCESS, organized: { test: true } };
    let reduced = apiReducer(undefined, action);
    let expected = { routes: [], service: [], organized: { test: true } };
    expect(reduced).toEqual(expected);
  });
});