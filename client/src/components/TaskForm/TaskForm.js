import React from 'react'
import PropTypes from 'prop-types';

import DateChanger from '../DateChanger/DateChanger';
import useTaskForm from '../../hooks/useTaskForm';
import Input from '../UI/Input/Input';


const TaskForm = props => {
    const { task = {} } = props;

    const form = useTaskForm(task.date, task.title, task.completed, task.id);

    const changeDate = (date) => {
        form.change('date', date, true);
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
        <form data-test="component-TaskForm" className="p-3">
            <DateChanger
                date={form.date.value}
                changeDate={changeDate} />
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
        </form >
    )
}

TaskForm.propTypes = {
    task: PropTypes.object,
};


export default TaskForm
