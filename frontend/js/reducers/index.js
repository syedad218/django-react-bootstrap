import { combineReducers } from 'redux';
import tickets from './tickets';
import errors from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
  tickets,
  errors,
  messages,
  auth,
});
