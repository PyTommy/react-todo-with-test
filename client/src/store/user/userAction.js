import axios from '../../axiosInstance';
import { setAlert } from '../alert/alertAction';

export const actionTypes = {
    SIGNUP: "SIGNUP",
    LOGIN: "LOGIN",
    LOAD_USER_SUCCESS: "LOAD_USER_SUCCESS",
    LOAD_USER_FAIL: "LOAD_USER_FAIL",
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
                payload: user
            });

            localStorage.setItem("token", token);
            axios.setAuthToken(localStorage.token);
        } catch (err) {
            dispatch(setAlert(err.response.data.message, "danger"));
        };
    };
};

export const login = (email, password) => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/user/login', {
                email, password
            });

            const { token, user } = res.data;

            dispatch({
                type: actionTypes.LOGIN,
                payload: user
            });

            localStorage.setItem("token", token);
            axios.setAuthToken(localStorage.token);
        } catch (err) {
            dispatch(setAlert(err.response ? err.response.data.message : err.message, "danger"));
        };
    };
};

// Load user data on store
export const loadUser = () => async dispatch => {
    if (!localStorage.token) {
        dispatch({ type: actionTypes.LOAD_USER_FAIL });
        return;
    };

    // Set auth header on default http request
    axios.setAuthToken(localStorage.token);

    try {
        const res = await axios.get('/api/user');

        dispatch(setAlert(`Welcome, ${res.data.user.username}`, "success"));
        dispatch({
            type: actionTypes.LOAD_USER_SUCCESS,
            payload: res.data.user
        });
    } catch (err) {
        dispatch(setAlert(err.response ? err.response.data.message : err.message, "danger"));
        dispatch({ type: actionTypes.LOAD_USER_FAIL });
        localStorage.removeItem('token');
        axios.setAuthToken();
    }
};

export const editUser = () => {
    return async dispatch => {

    };
};

export const deleteUser = () => {
    return async dispatch => {

    };
};