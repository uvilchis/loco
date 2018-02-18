import {
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  CHECK_LOGGED_SUCCESS,
  CHECK_LOGGED_FAIL,
  LOG_ERROR
} from '../actions/user';

// This is awful, this can be rewritten and made DRY somehow
export default function(state = { loggedIn: false, favorites: [] }, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return Object.assign({}, state, { loggedIn: action.loggedIn });
    case LOG_OUT_SUCCESS:
      return Object.assign({}, state, { loggedIn: action.loggedIn });
    case SIGN_UP_SUCCESS:
      return Object.assign({}, state, { loggedIn: action.loggedIn });
    case SIGN_UP_FAIL:
      return Object.assign({}, state, { loggedIn: action.loggedIn });
    case CHECK_LOGGED_SUCCESS:
      return Object.assign({}, state, { loggedIn: action.loggedIn });
    case CHECK_LOGGED_FAIL:
      return Object.assign({}, state, { loggedIn: action.loggedIn });
    case LOG_ERROR:
      return Object.assign({}, state, { loggedIn: action.loggedIn });
    default:
      return state;
  }
};