import { CHECK_LOGGED, LOG_IN, LOG_OUT } from '../actions/user';

export default function(state = { loggedIn: false, favorites: [] }, action) {
  switch (action.type) {
    case CHECK_LOGGED:
      return Object.assign({}, state, { loggedIn: action.loggedIn });
    case LOG_IN:
      return Object.assign({}, state, { loggedIn: true });
    case LOG_OUT:
      return Object.assign({}, state, { loggedIn: false });
    default:
      return state;
  }
};