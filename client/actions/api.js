import axios from 'axios';
import * as util from '../lib/util';

// Get routes data
export const GET_ROUTES_START = 'GET_ROUTES_START';
export const GET_ROUTES_SUCCESS = 'GET_ROUTES_SUCCESS';
export const GET_ROUTES_FAIL = 'GET_ROUTES_FAIL';

// Get service data
export const GET_SERVICE_START = 'GET_SERVICE_START';
export const GET_SERVICE_SUCCESS = 'GET_SERVICE_SUCCESS';
export const GET_SERVICE_FAIL = 'GET_SERVICE_FAIL';

// Organize routes with service grouping
// This is synchronous but it is only run in an asynchronous context
// To preserve redux flow, this will also be ran like an async redux call
export const ORGANIZE_ROUTES_START = 'ORGANIZE_ROUTES_START';
export const ORGANIZE_ROUTES_SUCCESS = 'ORGANIZE_ROUTES_SUCCESS';
export const ORGANIZE_ROUTES_FAIL = 'ORGANIZE_ROUTES_FAIL';

export const GET_ROUTES_AND_SERVICE_START = 'GET_ROUTES_AND_SERVICE_START';
export const GET_ROUTES_AND_SERVICE_SUCCESS = 'GET_ROUTES_AND_SERVICE_SUCCESS';
export const GET_ROUTES_AND_SERVICE_FAIL = 'GET_ROUTES_AND_SERVICE_FAIL';

// Get stops data
export const GET_STOPS_START = 'GET_STOPS_START';
export const GET_STOPS_SUCCESS = 'GET_STOPS_SUCCESS';
export const GET_STOPS_FAIL = 'GET_STOPS_FAIL';

const getRoutesStart = () => ({ type: GET_ROUTES_START });
const getRoutesSuccess = (routes) => ({ type: GET_ROUTES_SUCCESS, routes });
const getRoutesFail = () => ({ type: GET_ROUTES_FAIL });

const getServiceStart = () => ({ type: GET_SERVICE_START });
const getServiceSuccess = (service) => ({ type: GET_SERVICE_SUCCESS, service });
const getServiceFail = () => ({ type: GET_SERVICE_FAIL });

const organizeRoutesStart = () => ({ type: ORGANIZE_ROUTES_START });
const organizeRoutesSuccess = (organized) => ({ type: ORGANIZE_ROUTES_SUCCESS, organized });
const organizeRoutesFail = () => ({ type: ORGANIZE_ROUTES_FAIL });

const getRoutesAndServiceStart = () => ({ type: GET_ROUTES_AND_SERVICE_START });
const getRoutesAndServiceSuccess = () => ({ type: GET_ROUTES_AND_SERVICE_SUCCESS });
const getRoutesAndServiceFail = () => ({ type: GET_ROUTES_AND_SERVICE_FAIL });

const getStopsStart = () => ({ type: GET_STOPS_START });
const getStopsSuccess = (stops) => ({ type: GET_STOPS_SUCCESS, stops });
const getStopsFail = (stops) => ({ type: GET_STOPS_FAIL });

/**
 * Fetch all available routes from API
*/
export const getRoutes = () => (dispatch) => {
  dispatch(getRoutesStart());
  return axios.get('/api/routes', { params: { sub: 'mta' } })
  .then(({ data }) => dispatch(getRoutesSuccess(data)))
  .catch((error) => {
    // console.log('failed to get routes', error);
    dispatch(getRoutesFail());
  });
};

/** 
 * Fetch current service status information
*/
export const getService = () => (dispatch) => {
  dispatch(getServiceStart());
  return axios.get('/api/service', { params: { sub: 'mta' } })
  // The nature of MTA service data means the actual interesting data is locked behind lines
  .then(({ data }) => dispatch(getServiceSuccess(data.lines)))
  .catch((error) => {
    dispatch(getServiceFail());
  });
};

/**
 * Organizes data based on service
 * Helps to pare down routes information
 * Check out mocked data in test for more information
*/
export const organizeRoutes = () => (dispatch, getState) => {
  dispatch(organizeRoutesStart())
  try {
    let service = getState().service;
    let routes = getState().routes;
    let organized = util.routeOrganizer(service, routes);
    return dispatch(organizeRoutesSuccess(organized));
  } catch (exception) {
    dispatch(organizeRoutesFail());
  }
};

/**
 * Summative action to fetch routes and services, then organize them into a new organized object
 * Though organized is the primary output, we still want routes and service in state
*/
export const getRoutesAndService = () => (dispatch, getState) => {
  return dispatch(getRoutes())
  .then(() => dispatch(getService()))
  .then(() => dispatch(organizeRoutes()))
  .then(() => dispatch(getRoutesAndServiceSuccess()))
  .catch((error) => {
    // The last possible failing point here is here.
    // Not sure how this would get reached, but just in case
    dispatch(getRoutesAndServiceFail());
  });
};

/**
 * Fetch all stops available to a certain route by its id
 * 
 * Route ID is 
 * @param {*} routeId 
 */
export const getStops = (routeId) => (dispatch, getState) => {
  dispatch(getStopsStart());
  return axios.get('/api/stops', {
    params: {
      sub: 'mta',
      route_id: routeId
    }
  })
  .then(({ data }) => dispatch(getStopsSuccess(data)))
  .catch((error) => {
    dispatch(getStopsFail());
  });
};