import axios from 'axios';

// Get routes data
export const GET_ROUTES_START = 'GET_ROUTES_START';
export const GET_ROUTES_SUCCESS = 'GET_ROUTES_SUCCESS';
export const GET_ROUTES_FAIL = 'GET_ROUTES_FAIL';

// Get service data
export const GET_SERVICE_START = 'GET_SERVICE_START';
export const GET_SERVICE_SUCCESS = 'GET_SERVICE_SUCCESS';
export const GET_SERVICE_FAIL = 'GET_SERVICE_FAIL';

// Organize routes with service grouping
export const ORGANIZE_ROUTES = 'ORGANIZE_ROUTES';

// Get stops data
export const GET_STOPS_START = 'GET_STOPS_START';
export const GET_STOPS_SUCCESS = 'GET_STOPS_SUCCESS';
export const GET_STOPS_FAIL = 'GET_STOPS_FAIL';

export const getRoutes = () => (dispatch) => {
  axios.get('/api/routes', {
    params: { sub: 'mta' }
  })
  .then(({ data }) => dispatch(setRoutes(data)))
  .catch((error) => _failed(
    'get routes', 
    error,
    () => dispatch(setRoutes([]))
  ));
};

export const setRoutes = (routes) => {
  return { type: SET_ROUTES, routes };
};



const _failed = (type, error, cb) => {
  // TODO: make this better
  console.log(`failed to ${type}`, error);
  cb();
};