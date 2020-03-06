import React from 'react';
import PropTypes from 'prop-types';
import classes from './Task.module.css';

const Task = props => {
    const { task, isEditing, toggleComplete } = props;
    const buttonsClass = [];
    if (!isEditing) {
        buttonsClass.push(classes.hidden);
    }

    const onToggleCompletedHandler = () => {
        if (!isEditing) {
            toggleComplete();
        };
    };


    return (
        <div
            className={classes.Task}
            data-test='component-task'
            onClick={onToggleCompletedHandler}>
            <span data-test='task-title'>{task.title}</span>
            <div
                className={buttonsClass.join(' ')}
                data-test='task-buttons'>
                aaa
            </div>
        </div>
    );
};

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        userId: PropTypes.number.isRequired,
    }).isRequired,
    isEditing: PropTypes.bool.isRequired,
    toggleComplete: PropTypes.func.isRequired,
};

export default Task;