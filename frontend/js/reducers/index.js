import { combineReducers } from 'redux';
import tickets from './tickets';
import errors from './errors';

export default combineReducers({
  tickets,
  errors,
});
