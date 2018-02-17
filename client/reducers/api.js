import { GET_ROUTES, SET_ROUTES } from '../actions/api';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ROUTES:
      return Object.assign({}, state, { routes: action.routes });
    default: return state;
  }
};