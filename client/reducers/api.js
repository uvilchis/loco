import {
  GET_ROUTES_START,
  GET_ROUTES_SUCCESS,
  GET_ROUTES_FAIL,
  GET_SERVICE_START,
  GET_SERVICE_SUCCESS,
  GET_SERVICE_FAIL,
  ORGANIZE_ROUTES_SUCCESS,
  ORGANIZE_ROUTES_FAIL,
  GET_STOPS_START,
  GET_STOPS_SUCCESS,
  GET_STOPS_FAIL
} from '../actions/api';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ROUTES:
      return Object.assign({}, state, { routes: action.routes });
    default: return state;
  }
};