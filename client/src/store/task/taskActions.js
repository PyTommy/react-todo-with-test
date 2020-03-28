import axios from '../../axiosInstance';

import { setAlert } from '../alert/alertAction';
import TaskModel from '../../models/task';

export const actionTypes = {
    CREATE_TASK: "CREATE_TASK",
    SET_TASKS_BY_DATE: "SET_TASKS_BY_DATE",
    DELETE_TASK: "DELETE_TASK",
};


export const createTask = ({ title, date }) => {
    return async (dispatch, getState) => {
        try {
            const user = getState().user;

            const res = await axios.post('/api/task', { title, date });

            const taskId = res.data.id;

            const newTask = new TaskModel({
                id: taskId,
                title,
                date,
                completed: false,
                userId: +user.id
            });

            dispatch({
                type: actionTypes.CREATE_TASK,
                payload: newTask
            });
        } catch (err) {
            const message = err.response ? err.response.data.message : err.message;
            console.error(message);
            dispatch(setAlert(message));
        }
    };
};



export const getTasksByDate = (date) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/task?date=${date}`);

            const tasks = res.data.tasks.map(task => {
                return new TaskModel(task);
            });

            dispatch({
                type: actionTypes.SET_TASKS_BY_DATE,
                payload: tasks
            });
        } catch (err) {
            const message = err.response ? err.response.data.message : err.message;
            console.error(message);
            dispatch(setAlert(message));
        }
    };
};


export const editTask = ({ title, date, completed, id }) => {
    return null;
};

/**
 * Delete task from redux store and database.
 * @function deleteTask
 * @param {object} task - task to delete 
 */
export const deleteTask = (task) => {
    return async dispatch => {
        try {
            // delete a task from database
            await axios.delete(`/api/task?id=${task.id}`);

            // delete the task from redux store
            dispatch({
                type: actionTypes.DELETE_TASK,
                payload: {
                    id: task.id,
                    isoDate: task.date.toISOString()
                }
            });
        } catch (err) {
            const message = err.response ? err.response.data.message : err.message;
            console.error(message);
            dispatch(setAlert(message));
        }
    }
};