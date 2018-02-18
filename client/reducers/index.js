import loggedIn from './login';
import fetching from './fetching';
import api from './api';
import { combineReducers } from 'redux';

export default combineReducers({
  loggedIn,
  fetching,
  api
});