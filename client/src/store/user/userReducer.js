import { actionTypes } from './userAction';

/**
 * @function userReducer
 * @param {object} state - Object of tasks by date. {'isoDate': [{task}]} 
 * @param {object} action - action to be reduced.
 * @returns {object} - new task state.
 */
export default (state = { loading: true }, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.SIGNUP:
        case actionTypes.LOGIN:
        case actionTypes.LOAD_USER_SUCCESS:
            return payload;
        case actionTypes.LOAD_USER_FAIL:
            return {};
        default:
            return state;
    }
}