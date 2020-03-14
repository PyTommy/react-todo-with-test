import { combineReducers } from 'redux';
import alert from './alert/alertReducer';
import task from './task/taskReducer';
import user from './user/userReducer';

export default combineReducers({
    alert,
    task,
    user,
});