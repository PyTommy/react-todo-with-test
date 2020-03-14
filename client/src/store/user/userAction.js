import axios from '../../axiosInstance';
import { setAlert } from '../alert/alertAction';

export const actionTypes = {
    SIGNUP: "SIGNUP",
    LOGIN: "LOGIN",
    LOAD_USER: "LOAD_USER",
};


export const signup = (username, email, password) => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/user/signup', {
                username, email, password
            });

            const { token, user } = res.data;

            dispatch({
                type: actionTypes.SIGNUP,
                payload: { token, user }
            });

            localStorage.setItem("token", token);
        } catch (err) {
            dispatch(setAlert(err.response.data.message, "danger"));
        };
    };
};

export const login = (email, password) => {
    return async dispatch => {

    };
};

export const loadUser = () => {
    return async dispatch => {

    };
};

export const editUser = () => {
    return async dispatch => {

    };
};

export const deleteUser = () => {
    return async dispatch => {

    };
};