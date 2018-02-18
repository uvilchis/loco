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
export const ORGANIZE_ROUTES_SUCCESS = 'ORGANIZE_ROUTES_SUCCESS';
export const ORGANIZE_ROUTES_FAIL = 'ORGANIZE_ROUTES_FAIL';

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

const organizeRoutesSuccess = (organized) => ({ type: ORGANIZE_ROUTES_SUCCESS, organized });
const organizeRoutesFail = () => ({ type: ORGANIZE_ROUTES_FAIL });

export const getRoutes = () => (dispatch) => {
  dispatch(getRoutesStart());
  return axios.get('/api/routes', { params: { sub: 'mta' } })
  .then(({ data }) => dispatch(getRoutesSuccess(data)))
  .catch((error) => {
    // console.log('failed to get routes', error);
    dispatch(getRoutesFail());
  });
};

export const getService = () => (dispatch) => {
  dispatch(getServiceStart());
  return axios.get('/api/service', { params: { sub: 'mta' } })
  .then(({ data }) => dispatch(getServiceSuccess(data)))
  .catch((error) => {
    dispatch(getServiceFail());
  });
};

export const getRoutesAndService = () => (dispatch, getState) => {
  return dispatch(getRoutes())
  .then(() => dispatch(getService()))
  .then(() => {
    let service = getState().service.lines || [];
    let routes = getState().routes || [];
    dispatch(organizeRoutesSuccess(util.routeOrganizer(service, routes)));
  })
  .catch((error) => {
    console.log(error)
    dispatch(organizeRoutesFail());
  });
};