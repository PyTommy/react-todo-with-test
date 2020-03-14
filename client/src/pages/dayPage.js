import React from 'react'
import PropTypes from 'prop-types'

import classes from './DayPage.module.scss';
import Tasks from '../components/Tasks/Tasks';
import TaskForm from '../components/TaskForm/TaskForm';


const DayPage = props => {
    return (
        <div className={classes.DayPage}>
            <div className={classes.main}>
                <Tasks />
            </div>
            <div className={[classes.sideBar, "border-left"].join(" ")}>
                <TaskForm />
            </div>
        </div>
    )
}

DayPage.propTypes = {

}

export default DayPage;
