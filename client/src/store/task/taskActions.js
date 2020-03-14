import axios from '../../axiosInstance';

import { setAlert } from '../alert/alertAction';
import TaskModel from '../../models/task';

export const actionTypes = {
    CREATE_TASK: "CREATE_TASK",
};


export const createTask = ({ title, date }) => {
    return async (dispatch, getState) => {
        try {
            const user = getState().user;

            const res = await axios.post('/api/task');

            const taskId = res.data.id;

            const newTask = new TaskModel({
                id: taskId,
                title,
                date,
                completed: false,
                userId: user.id
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

export const editTask = ({ title, date, completed, id }) => {
    return null;
};