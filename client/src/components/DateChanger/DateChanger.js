import React from 'react'
import moment from 'moment';

import DropdownCalender from '../DropdownCalender/DropdownCalender';

const DateChanger = ({ date, changeDate }) => {
    const [showCalender, setShowCalender] = React.useState(false);

    const toggleShowCalender = () => {
        setShowCalender(prevState => !prevState);
    };

    const changeDateHandler = (newDate) => {
        changeDate(newDate);
        toggleShowCalender();
    };

    return (
        <div>
            <div
                data-test="show-date"
                className="btn btn-light btn-lg shadow-none mt-2 mb-2 mr-auto ml-auto"
                onClick={toggleShowCalender}>
                {moment(date).format('YYYY/MM/DD')}
            </div>
            <DropdownCalender
                show={showCalender}
                date={date}
                onChange={changeDateHandler}
                close={toggleShowCalender} />
        </div>
    )
}

export default DateChanger
