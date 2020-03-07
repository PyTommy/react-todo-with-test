import React from 'react'
import PropTypes from 'prop-types'

import classes from './DayPage.module.scss';
import Tasks from '../components/Tasks/Tasks';
import AddTaskForm from '../components/AddTaskForm/AddTaskFrom';


const DayPage = props => {
    return (
        <div className={classes.DayPage}>
            <div className={classes.main}>
                <Tasks />
            </div>
            <div className={[classes.sideBar, "border-left"].join(" ")}>
                <AddTaskForm />
            </div>
        </div>
    )
}

DayPage.propTypes = {

}

export default DayPage;
