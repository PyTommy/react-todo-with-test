import React from 'react'
import moment from 'moment';
import PropTypes from 'prop-types';

import DropdownCalender from '../DropdownCalender/DropdownCalender';
import useTaskForm from '../../hooks/useTaskForm';
import Input from '../UI/Input/Input';


const TaskForm = props => {
    const { task = {} } = props;

    const [showCalender, setShowCalender] = React.useState(false);
    const form = useTaskForm(task.date, task.title, task.completed, task.id);

    const toggleShowCalender = () => {
        setShowCalender(prevState => !prevState);
    };

    const changeDate = (date) => {
        form.change('date', date, true);
        toggleShowCalender();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (form.validity) {
            form.submit();
        } else {
            alert("You should set");
        }
    };

    return (
        <form
            data-test="component-TaskForm"
            className="p-3">
            <div
                data-test="show-date"
                className="btn btn-light btn-lg shadow-none mt-2 mb-2 mr-auto ml-auto"
                onClick={toggleShowCalender}>
                {moment(form.date.value).format('YYYY/MM/DD')}
            </div>
            <DropdownCalender
                show={showCalender}
                date={form.date.value}
                onChange={changeDate}
                close={toggleShowCalender} />
            <div className="input-group mb-3">
                <Input
                    required
                    maxLength={50}
                    placeholder="New Task"
                    identifier="title"
                    onChange={form.change}
                    value={form.title.value} />
                <div className="input-group-append">
                    <button
                        data-test="submit-btn"
                        onClick={onSubmit}
                        className="btn btn-outline-info shadow-none">
                        Add
                    </button>
                </div>
            </div>
        </form>
    )
}

TaskForm.propTypes = {
    task: PropTypes.object,
};


export default TaskForm
