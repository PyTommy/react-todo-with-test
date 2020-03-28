import React from 'react';
import * as reactRedux from 'react-redux';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Tasks from './Tasks';
import Task from '../Task/Task';
import * as taskActions from '../../store/task/taskActions';
import { findByTestAttr, storeFactory, checkProps } from '../../../test/testUtils';
import { taskU1D1Cf, taskU1D1Ct, taskU1D2Cf } from '../../../test/fixtures';

// Define test util values
let wrapper;

// Defined dates of dummy data
const day1 = taskU1D1Cf.date;
const day1Str = taskU1D1Cf.date.toISOString();
const day2Str = taskU1D2Cf.date.toISOString();
const defaultTaskState = {
    [day1Str]: [taskU1D1Ct, taskU1D1Cf],
    [day2Str]: [taskU1D2Cf]
}

const defaultProps = {
    selectedDate: day1
};

// mock dispatch
const mockDispatch = jest.fn();
reactRedux.useDispatch = jest.fn(fn => mockDispatch);

// mock action creators
const mockGetTasksByDate = jest.fn();
const mockDeleteTask = jest.fn();
taskActions.getTasksByDate = mockGetTasksByDate;
taskActions.deleteTask = mockDeleteTask;

/**
 * Setup
 * @param {object} props
 * @param {object} task
 */
const setup = (
    props = defaultProps,
    task = defaultTaskState
) => {
    // clear mock funcs
    mockDispatch.mockClear();
    mockGetTasksByDate.mockClear();
    mockDeleteTask.mockClear();

    // Set dummy store
    const store = storeFactory({ task });

    // Set wrapper
    wrapper = mount(
        <Provider store={store}>
            <Tasks {...props} />
        </Provider>
    );
};

test('Prop types', () => {
    checkProps(Tasks, defaultProps);
});

describe('<Tasks /> renders', () => {

    test('component', () => {
        setup();
        const component = findByTestAttr(wrapper, 'component-tasks');
        expect(component.length).toBe(1);
    });

    test('some <Task /> if tasks exist', () => {
        setup();
        const taskComps = wrapper.find(Task);

        expect(taskComps.length).toBe(2);
    });

    test('some <Task /> if tasks exist', () => {
        setup({ selectedDate: new Date(1999, 0, 2) });
        const taskComps = wrapper.find(Task);

        expect(taskComps.length).toBe(0);
    });
});

describe('useEffect', () => {
    test('didMount', () => {
        setup();

        expect(mockGetTasksByDate).toHaveBeenCalledTimes(1);
    })
});


describe('functions', () => {
    test('onClickDelete', () => {
        setup();
        const taskComps = wrapper.find(Task);
        const taskComp = taskComps.at(0);
        const onClickDelete = taskComp.prop('onClickDelete');
        onClickDelete();

        expect(mockDeleteTask).toHaveBeenCalledTimes(1);
    })
});