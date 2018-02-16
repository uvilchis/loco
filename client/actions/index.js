import axios from 'axios';
// User login status
export const CHECK_LOGGED = 'CHECK_LOGGED';
export const TRY_LOG_IN = 'TRY_LOG_IN';
export const LOG_IN = 'LOGIN';
export const LOG_OUT = 'LOGOUT';

// Main routes page
export const GET_SERVICE = 'GET_SERVICE';
export const RECEIVE_SERVICE = 'RECEIVE_SERVICE';

export const GET_ROUTES = 'GET_ROUTES';
export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';


// Action creators
export const checkLogged = () => (dispatch) => {
  axios.get('/api/user/start')
  .then(({ data }) => dispatch(logIn()))
  .catch((error) => {
    // TODO: Make this better
    console.log('not logged in');
    dispatch(logOut());
  });
};

export const tryLogIn = ({ username, password }) => (dispatch) => {
  axios.post('/api/user/login', { username, password })
  .then((response) => dispatch(logIn()))
  .catch((error) => {
    // TODO: make this better
    console.log('failed');
    dispatch(logOut());
  });
};

// Since we don't track user login data on the client, we only need true/false for loggedIn status
export const logIn = () => ({ type: LOG_IN });
export const logOut = () => ({ type: LOG_OUT });

export const getService = () => {
  return { type: GET_SERVICE };
};
export const receiveService = (service) => {
  return {
    type: RECEIVE_SERVICE,
    fetching: false,
    service
  };
};

export const getRoutes = () => { type: GET_ROUTES };