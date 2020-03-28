import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTasksByDate } from '../../store/task/taskActions';
import generateToday from '../../utils/generateToday';
import Task from '../Task/Task';

const Tasks = props => {
    const { selectedDate = generateToday() } = props;
    const isoSelectedDate = selectedDate.toISOString();

    const [isEditing, setIsEditing] = useState(false);
    const tasks = useSelector(state => state.task[isoSelectedDate]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasksByDate(isoSelectedDate));
    }, [isoSelectedDate, dispatch]);

    const toggleComplete = () => {
    };

    const onClickEdit = () => {

    };

    const onClickDelete = () => {

    };

    console.log(tasks);

    const jsxTasks = tasks ? tasks.map(task => (
        <Task
            key={task.id}
            task={task}
            isEditing={isEditing}
            toggleComplete={toggleComplete}
            onClickEdit={onClickDelete}
            onClickDelete={onClickDelete} />
    )) : <p>No task</p>;

    return (
        <div data-test="component-tasks">
            {jsxTasks}
            <button onClick={() => { setIsEditing(prev => !prev) }}>{isEditing ? "Finish Edit" : "Edit"}</button>
        </div>
    )
}


export default Tasks
