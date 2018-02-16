import { CHECK_LOGGED, LOG_IN, LOG_OUT } from '../actions';

export default function(state = false, action) {
  switch (action.type) {
    case CHECK_LOGGED:
      return state;
    case LOG_IN:
      return true;
    case LOG_OUT:
      return false;
    default:
      return state;
  }
};