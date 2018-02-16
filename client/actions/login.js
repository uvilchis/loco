import axios from 'axios';

export const CHECK_LOGGED = 'CHECK_LOGGED';
export const TRY_LOG_IN = 'TRY_LOG_IN';
export const TRY_LOG_OUT = 'TRY_LOG_OUT';
export const TRY_SIGN_UP = 'TRY_SIGN_UP';
export const LOG_IN = 'LOGIN';
export const LOG_OUT = 'LOGOUT';

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
  .catch((error) => _failed('login', error, dispatch));
};

export const tryLogOut = () => (dispatch) => {
  axios.get('/api/user/logout')
  .then((response) => dispatch(logOut()))
  .catch((error) => _failed('logout', error, dispatch));
};

export const trySignUp = ({ username, password }) => (dispatch) => {
  axios.post('/api/user/signup', { username, password })
  .then((response) => dispatch(logIn()))
  .catch((error) => _failed('signup', error, dispatch));
};

const _failed = (type, error, dispatch) => {
  // TODO: make this better
  console.log(`failed to ${type}`, error);
  dispatch(logOut());
};

// Since we don't track user login data on the client, we only need true/false for loggedIn status
export const logIn = () => ({ type: LOG_IN });
export const logOut = () => ({ type: LOG_OUT });