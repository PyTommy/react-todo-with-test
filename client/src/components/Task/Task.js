import React from 'react';
import PropTypes from 'prop-types';
import classes from './Task.module.scss';


const Task = props => {
    const { task, isEditing, toggleComplete, onClickEdit, onClickDelete } = props;

    // Styles
    const componentTaskClass = ["d-flex justify-content-between align-items-center list-group-item list-group-item-action p-0 rounded-0 overflow-hidden"];
    if (!isEditing) {
        componentTaskClass.push(classes.TaskNotEditing);
    };

    const titleClass = ["p-2 pl-3 pr-3"];
    if (task.completed) {
        titleClass.push(classes.titleCompleted, "text-secondary");
    }

    const buttonsClass = [classes.buttons, "p-2"];
    isEditing
        ? buttonsClass.push(classes.buttonsShown)
        : buttonsClass.push(classes.buttonsHidden);

    // Functions
    const onToggleCompletedHandler = () => {
        if (!isEditing) {
            toggleComplete();
        };
    };

    return (
        <div
            className={componentTaskClass.join(' ')}
            data-test='component-task'
            onClick={() => onToggleCompletedHandler()}
        >
            <span className={titleClass.join(" ")} data-test='task-title'>{task.title}</span>
            <div
                className={buttonsClass.join(' ')}
                data-test='task-buttons'>
                <button
                    data-test="task-edit"
                    onClick={onClickEdit}
                    className="btn btn-warning rounded-circle mr-2">
                    <ion-icon name="pencil-outline"></ion-icon>
                </button>
                <button
                    data-test="task-delete"
                    onClick={onClickDelete}
                    className="btn btn-danger rounded-circle">
                    <ion-icon name="trash-bin"></ion-icon>
                </button>
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