import React from 'react';
import { useDispatch } from 'react-redux';

import generateToday from '../utils/generateToday';
import { createTask, editTask } from '../store/task/taskActions';

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
const useTaskForm = (
    initialDate = generateToday(),
    initialTitle = "",
    completed,
    id
) => {

    // Validate Initial values
    if (initialTitle && typeof initialTitle !== 'string') {
        throw new Error("`initialTitle` should be string");
    };
    if (!(initialDate instanceof Date)) {
        throw new Error("`initialDate` should be instance of Date object");
    };
    if (completed !== undefined && typeof completed !== 'boolean') {
        throw new Error("`completed` should be boolean");
    };
    if (id !== undefined && typeof id !== 'number') {
        throw new Error("`id` should be a number");
    };

    // state
    const [state, setState] = React.useState({
        title: {
            value: initialTitle,
            isValid: !!initialTitle,
        },
        date: {
            value: initialDate,
            isValid: !!initialDate
        }
    });
    const [validity, setValidity] = React.useState(!!initialTitle && !!initialDate);
    const dispatch = useDispatch();

    // Update validity when state.title.isValid or state.date.isValid changed. 
    React.useEffect(() => {
        const identifiers = Object.keys(state);

        let newValidity = true;
        identifiers.forEach(identifier => {
            newValidity = newValidity && state[identifier].isValid;
        });

        if (validity !== newValidity) {
            setValidity(() => newValidity);
        }
    }, [state.title.isValid, state.date.isValid]);


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

        if (id === undefined) { // avoid the case that id === 0
            dispatch(createTask({
                title: state.title.value,
                date: state.date.value
            }));
            console.log("after createTask with dispatch")
        } else {
            dispatch(editTask({
                title: state.title.value,
                date: state.date.value,
                completed,
                id
            }));
        };

        setState(prevState => ({
            ...prevState,
            title: {
                value: '',
                isValid: false
            }
        }));
    };

    return {
        title: state.title,
        date: state.date,
        validity,
        change,
        submit,
    };
};

export default useTaskForm;