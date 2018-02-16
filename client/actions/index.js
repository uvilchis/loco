// Main routes page
export const GET_SERVICE = 'GET_SERVICE';
export const RECEIVE_SERVICE = 'RECEIVE_SERVICE';

export const GET_ROUTES = 'GET_ROUTES';
export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';

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