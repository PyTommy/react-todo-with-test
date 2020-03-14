import { actionTypes } from './userAction';

/**
 * @function userReducer
 * @param {object} state - Object of tasks by date. {'isoDate': [{task}]} 
 * @param {object} action - action to be reduced.
 * @returns {object} - new task state.
 */
export default (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.SIGNUP:
            return payload;
        default:
            return state;
    }
}