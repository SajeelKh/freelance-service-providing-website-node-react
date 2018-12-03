import { combineReducers } from 'redux';
import { alert } from './alert-reducer';
import { users } from './users-reducer';
import { authentication } from './auth-reducer';

export default combineReducers({
    authentication,
    users,
    alert,
});