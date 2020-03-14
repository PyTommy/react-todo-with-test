import React from 'react';
import { useDispatch } from 'react-redux';

import { signup } from '../store/user/userAction';
import { setAlert } from '../store/alert/alertAction';

/**
 * form state hooks
 * @param {date|undefined} initialDate - Today is applied if not provided.
 * @param {string|undefined} initialTitle - task title to edit.
 * @param {boolean|undefined} completed - completed state of the editing task.
 * @param {number|undefined} id - task id to edit
 * @returns {object} { title, date, validity, change, submit }
 * @example
 * const form = useTaskForm();
 * console.log(form.title.value);
 * form.change("title", "Finish homework", true); // change(identifier, value, isValid)
 * form.submit();
 */
const useAuthForm = () => {
    const [state, setState] = React.useState({
        // username: {
        //     value: "",
        //     isValid: false
        // },
        // email: {
        //     value: "",
        //     isValid: false
        // },
        // password: {
        //     value: "",
        //     isValid: false
        // },
        // confirmPassword: {
        //     value: "",
        //     isValid: false
        // }
        username: {
            value: "Test",
            isValid: true
        },
        email: {
            value: "test@test.com",
            isValid: true
        },
        password: {
            value: "testtest",
            isValid: true
        },
        confirmPassword: {
            value: "testtest",
            isValid: true
        }
    });
    const [isSignupForm, setIsSignupForm] = React.useState(false);
    const [validity, setValidity] = React.useState(false);
    const dispatch = useDispatch();

    // Update validity when state.title.isValid or state.date.isValid changed. 
    React.useEffect(() => {
        const identifiers = Object.keys(state);

        let newValidity = true;
        if (isSignupForm) {
            identifiers.forEach(identifier => {
                newValidity = newValidity && state[identifier].isValid;
            });
        } else {
            newValidity = newValidity && state.email.isValid;
            newValidity = newValidity && state.password.isValid;
        }

        if (validity !== newValidity) {
            setValidity(() => newValidity);
        }
    }, [state, isSignupForm]);

    /**
     * Change a prop value of the form state.
     * @param {any} value 
     * @param {string} identifier - title || date 
     * @param {boolean} isValid  
     */
    const change = (identifier, value, isValid) => {
        setState(prevState => ({
            ...prevState,
            [identifier]: {
                value,
                isValid
            }
        }));
    };

    /**
    * create or edit a task and clear title. Throw error if not valid.
    * @param {any} value
    * @param {string} identifier - title || date
    */
    const submit = () => {
        if (!validity) {
            throw new Error('Form is not valid');
        };

        if (isSignupForm) {
            if (state.password.value !== state.confirmPassword.value) {
                return dispatch(setAlert("Password doesn't match"));
            };
            dispatch(signup(
                state.username.value,
                state.email.value,
                state.password.value,
            ));
        } else {
            // Login
            console.log("Login");
        };
    };

    const toggleForm = () => {
        setIsSignupForm(prevState => !prevState);
    };

    return {
        username: state.username,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
        validity,
        isSignupForm,
        toggleForm,
        change,
        submit,
    };
};

export default useAuthForm;