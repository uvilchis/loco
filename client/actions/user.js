import axios from 'axios';

export const LOG_ERROR = 'LOG_ERROR';

export const LOG_IN_START = 'LOG_IN_START';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';

export const LOG_OUT_START = 'LOG_OUT_START';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAIL = 'LOG_OUT_FAIL';

export const CHECK_LOGGED_START = 'CHECK_LOGGED';
export const CHECK_LOGGED_SUCCESS = 'CHECK_LOGGED_SUCCESS';
export const CHECK_LOGGED_FAIL = 'CHECK_LOGGED_FAIL';

export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';



// "Actionables" with actual payload
export const logInSuccess = () => ({ type: LOG_IN_SUCCESS, loggedIn: true });
export const logOutSuccess = () => ({ type: LOG_OUT_SUCCESS, loggedIn: false });
export const signUpSuccess = () => ({ type: SIGN_UP_SUCCESS, loggedIn: true });
export const signUpFail = () => ({ type: SIGN_UP_FAIL, loggedIn: false });
export const checkLoggedSuccess = () => ({ type: CHECK_LOGGED_SUCCESS, loggedIn: true });
export const checkLoggedFail = () => ({ type: CHECK_LOGGED_FAIL, loggedIn: false });

export const logError = (loggedIn) => ({ type: LOG_ERROR, loggedIn })

// Used within the actions file
const logInStart = () => ({ type: LOG_IN_START });
const logInFail = () => ({ type: LOG_IN_FAIL });

const logOutStart = () => ({ type: LOG_OUT_START });
const logOutFail = () => ({ type: LOG_OUT_FAIL });

const signUpStart = () => ({ type: SIGN_UP_START });

const checkLoggedStart = () => ({ type: CHECK_LOGGED_START });



// Helper method for failed attempts to do most login stuff
const _failed = (type, error, dispatch, getState) => {
  // TODO: make this better
  // console.log(`failed to ${type}`, error);

  // Preserve current login status to keep in sync with server (sorry users)
  dispatch(logError(getState().loggedIn)); 
};

export const tryLogIn = ({ username, password }) => (dispatch, getState) => {
  dispatch(logInStart());
  return axios.post('/api/user/login', { username, password })
  .then((response) => dispatch(logInSuccess()))
  .catch((error) => _failed('login', error, dispatch, getState));
};

export const tryLogOut = () => (dispatch, getState) => {
  dispatch(logOutStart());
  return axios.get('/api/user/logout')
  .then((response) => dispatch(logOutSuccess()))
  .catch((error) => _failed('logout', error, dispatch, getState));
};

export const trySignUp = ({ username, password }) => (dispatch, getState) => {
  dispatch(signUpStart());
  return axios.post('/api/user/signup', { username, password })
  .then((response) => dispatch(signUpSuccess()))
  .catch((error) => {
    dispatch(signUpFail());
  });
};

export const checkLogged = () => (dispatch) => {
  dispatch(checkLoggedStart());
  return axios.get('/api/user/start')
  .then(({ data }) => dispatch(checkLoggedSuccess()))
  .catch((error) => {
    // TODO: Make this better
    dispatch(checkLoggedFail());
  });
};