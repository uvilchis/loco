import { CHECK_LOGGED, LOG_IN, LOG_OUT } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case CHECK_LOGGED:
      return console.log(action.type);
    case LOG_IN:
      return console.log(action.type);
    case LOG_OUT:
      return console.log(action.type);
    default:
      return state;
  }
};