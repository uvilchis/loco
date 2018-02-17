import axios from 'axios';

// Get routes data
export const GET_ROUTES = 'GET_ROUTES';
export const SET_ROUTES = 'SET_ROUTES';

// Get service data
export const GET_SERVICE = 'GET_SERVICE';
export const SET_SERVICE = 'SET_SERVICE';

// Get stops data
// export const GET_STOPS = 'GET_STOPS';
// export const SET_STOPS = 'SET_STOPS';

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