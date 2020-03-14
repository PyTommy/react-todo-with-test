
import uuid from 'uuid';
export const actionTypes = {
    SET_ALERT: "SET_ALERT",
    REMOVE_ALERT: "REMOVE_ALERT"
};

export const setAlert = (message, alertType = "danger", timeout = 4000) => dispatch => {
    if (message instanceof Array) {
        message.forEach((singleMessage) => {
            const id = uuid.v4();
            dispatch({
                type: actionTypes.SET_ALERT,
                payload: {
                    id,
                    message: singleMessage.message,
                    alertType
                }
            });
            setTimeout(() => {
                dispatch({
                    type: actionTypes.REMOVE_ALERT,
                    payload: id
                })
            }, timeout);
        })
    } else {
        const id = uuid.v4();
        dispatch({
            type: actionTypes.SET_ALERT,
            payload: {
                id,
                message,
                alertType
            }
        });
        setTimeout(() => {
            dispatch({
                type: actionTypes.REMOVE_ALERT,
                payload: id
            })
        }, timeout);
    }
};