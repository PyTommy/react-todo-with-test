import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getTasksByDate, deleteTask, toggleCompleted } from '../../store/task/taskActions';
import Task from '../Task/Task';

const Tasks = props => {
    const { selectedDate, isEditing } = props;
    const isoSelectedDate = selectedDate.toISOString();

    const tasks = useSelector(state => state.task[isoSelectedDate]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasksByDate(isoSelectedDate));
    }, [isoSelectedDate, dispatch]);

    const onToggleCompleteHandler = (task) => {
        dispatch(toggleCompleted(task))
    };

    const onClickEdit = () => {

    };

    const onClickDelete = (task) => {
        dispatch(deleteTask(task));
    };

    const jsxTasks = tasks ? tasks.map(task => (
        <Task
            key={task.id}
            task={task}
            isEditing={isEditing}
            toggleComplete={() => onToggleCompleteHandler(task)}
            onClickEdit={onClickEdit}
            onClickDelete={() => onClickDelete(task)} />
    )) : <p>No task</p>;

    return (
        <div data-test="component-tasks">
            {jsxTasks}
        </div>
    )
}

Tasks.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    isEditing: PropTypes.bool,
};

export default Tasks
