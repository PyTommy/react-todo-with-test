import React from 'react'

import DateChanger from '../DateChanger/DateChanger';
import classes from './TasksTopBar.module.scss';

const DateChangeBar = ({ selectedDate, changeDate, isEditing, toggleEditing }) => {


    const dateBack = () => {
        changeDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000));
    }

    const dateForward = () => {
        changeDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000));
    };

    return (
        <div className="border-bottom d-flex align-items-center pl-3 pr-3">
            <div className={classes.iconContainer} onClick={dateBack}>
                <ion-icon name="chevron-back-outline"></ion-icon>
            </div>
            <div className={classes.DateChangeContainer}>
                <DateChanger date={selectedDate} changeDate={changeDate} />
            </div>
            <div className={classes.iconContainer} onClick={dateForward}>
                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <button className="ml-auto btn btn-light shadow-none" onClick={toggleEditing}>{isEditing ? "Finish Edit" : "Edit"}</button>
        </div>
    )
}

export default DateChangeBar
