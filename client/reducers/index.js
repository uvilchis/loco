import loggedIn from './login';
import fetching from './fetching';
import routes from './routes';
import service from './service';
import { combineReducers } from 'redux';

export default combineReducers({
  loggedIn,
  fetching,
  routes,
  service
});