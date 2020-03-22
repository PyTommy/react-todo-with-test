import { actionTypes } from './taskActions';

/**
 * @function taskReducer
 * @param {object} state - Object of tasks by date. {'isoDate': [{task}]} 
 * @param {object} action - action to be reduced.
 * @returns {object} - new task state.
 */
export default (state = {}, action) => {
    const { type, payload } = action;
    let isoDate;

    switch (type) {
        case actionTypes.CREATE_TASK:
            isoDate = payload.date.toISOString();

            if (state[isoDate]) {
                return {
                    ...state,
                    [isoDate]: [payload, ...state[isoDate]]
                };
            } else {
                return {
                    ...state,
                    [isoDate]: [payload]
                };
            }
        case actionTypes.SET_TASKS_BY_DATE:
            if (payload.length > 0) {
                isoDate = payload[0].date.toISOString();
                return {
                    ...state,
                    [isoDate]: [...payload]
                };
            }
        default:
            return state;
    }
}