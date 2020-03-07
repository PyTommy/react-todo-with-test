import { combineReducers } from 'redux';
import task from './task/taskReducer';
import user from './user/userReducer';

export default combineReducers({
    task,
    user,
});