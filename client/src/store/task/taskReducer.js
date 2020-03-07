/**
 * @function taskReducer
 * @param {object} state - Object of tasks by date. {'isoDate': [{task}]} 
 * @param {object} action - action to be reduced.
 * @returns {object} - new task state.
 */
export default (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
}