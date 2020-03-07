import React from 'react';
import PropTypes from 'prop-types'
import Calendar from 'react-calendar';

import classes from './DropdownCalender.module.scss';

/**
 * Dropdown Calender
 * @param {object} props
 * @example 
 * <Calender 
 *     show={true} 
 *     date={new Date(2020, 0, 2)} 
 *     onChange={changeDate(date)} 
 *     close={toggleShow(prevState => !prevState)}/> 
 */
const dropdownCalender = props => {
    const { show, date, onChange, close } = props;

    return show ? (
        <div className={classes.calenderContainer}>
            <div className={classes.backdrop} onClick={close} />
            <Calendar className={classes.calender} value={date} onChange={onChange} />
        </div>
    ) : null;
};

dropdownCalender.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
}

export default dropdownCalender

