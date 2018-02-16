// User login status
export const CHECK_LOGGED = 'CHECK_LOGGED';
export const LOG_IN = 'LOGIN';
export const LOG_OUT = 'LOGOUT';

// Main routes page
export const GET_SERVICE = 'GET_SERVICE';
export const RECEIVE_SERVICE = 'RECEIVE_SERVICE';

export const GET_ROUTES = 'GET_ROUTES';
export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';


// Action creators

export const checkLogged = () => {
  return {
    type: CHECK_LOGGED
  };
};

export const logIn = (userInfo) => {
  return { type: LOGIN,userInfo }
};

export const logOut = () => {
  return { type: LOGOUT };
};


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