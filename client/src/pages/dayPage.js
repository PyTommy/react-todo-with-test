import React from 'react'

import classes from './DayPage.module.scss';
import Tasks from '../components/Tasks/Tasks';
import TaskForm from '../components/TaskForm/TaskForm';
import DateChangeBar from '../components/TasksTopBar/TasksTopBar';
import generateToday from '../utils/generateToday';

const DayPage = () => {
    const initialSelectedDate = generateToday();
    const [selectedDate, setSelectedDate] = React.useState(initialSelectedDate);
    const [isEditing, setIsEditing] = React.useState(false);

    const changeDate = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className={classes.DayPage}>
            <div className={classes.main}>
                <DateChangeBar
                    selectedDate={selectedDate}
                    changeDate={changeDate}
                    isEditing={isEditing}
                    toggleEditing={() => setIsEditing(prevState => !prevState)} />
                <Tasks selectedDate={selectedDate} isEditing={isEditing} />
            </div>
            <div className={[classes.sideBar, "border-left"].join(" ")}>
                <TaskForm />
            </div>
        </div>
    )
}

export default DayPage;
