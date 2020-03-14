import React, { useState } from 'react'
import Task from '../Task/Task';

const Tasks = props => {
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState({
        id: 1,
        title: 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーで',
        completed: false,
        date: new Date(2020, 0, 2),
        userId: 1,
    });

    const toggleComplete = () => {
        setTask(prevState => ({
            ...prevState,
            completed: !prevState.completed,
        }));
    };

    const onClickEdit = () => {

    };

    const onClickDelete = () => {

    };

    return (
        <div data-test="component-tasks">
            <Task
                task={task}
                isEditing={isEditing}
                toggleComplete={toggleComplete}
                onClickEdit={onClickDelete}
                onClickDelete={onClickDelete} />
            <button onClick={() => { setIsEditing(prev => !prev) }}>{isEditing ? "Finish Edit" : "Edit"}</button>
        </div>
    )
}


export default Tasks
