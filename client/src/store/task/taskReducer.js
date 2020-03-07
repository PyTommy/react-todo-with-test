import { actionTypes } from './taskActions';

/**
 * @function taskReducer
 * @param {object} state - Object of tasks by date. {'isoDate': [{task}]} 
 * @param {object} action - action to be reduced.
 * @returns {object} - new task state.
 */
export default (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.CREATE_TASK:
            const isoDate = payload.date.toISOString();

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

        default:
            return state;
    }
}