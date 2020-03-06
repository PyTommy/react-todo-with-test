import React from 'react';
import { shallow } from 'enzyme';

import Task from './Task';
import { findByTestAttr, checkProps } from '../../../test/testUtils';

let wrapper, mockToggleComplete;
let appliedProps;

const setup = (props) => {
    mockToggleComplete = jest.fn();

    appliedProps = {
        task: {
            id: 1,
            title: 'Studying test for react',
            completed: false,
            date: new Date(2020, 0, 2),
            userId: 1,
        },
        isEditing: false,
        toggleComplete: mockToggleComplete,
    };

    wrapper = shallow(<Task {...appliedProps} {...props} />);
};

describe('If task is not completed and not editing', () => {
    beforeEach(() => {
        setup();
    });

    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-task');
        expect(component.length).toBe(1);
    });

    test('renders title', () => {
        const taskTitle = findByTestAttr(wrapper, 'task-title');
        expect(taskTitle.length).toBe(1);
    });

    test('renders buttons with hidden', () => {
        const taskButtons = findByTestAttr(wrapper, 'task-buttons');
        expect(taskButtons.length).toBe(1);
        expect(taskButtons.hasClass('hidden')).toBe(true);
    });

    test('clicking component call `toggleComplete`', () => {
        const component = findByTestAttr(wrapper, 'component-task');

        component.simulate("click");
        expect(mockToggleComplete).toHaveBeenCalledTimes(1);
    });
    test('propTypes does not throw warning', () => {
        checkProps(Task, appliedProps);
    });
});

describe('If editing', () => {
    beforeEach(() => {
        setup({ isEditing: true });
    });

    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-task');
        expect(component.length).toBe(1);
    });

    test('renders title', () => {
        const taskTitle = findByTestAttr(wrapper, 'task-title');
        expect(taskTitle.length).toBe(1);
    });

    test('renders buttons without hidden', () => {
        const taskButtons = findByTestAttr(wrapper, 'task-buttons');
        expect(taskButtons.hasClass('hidden')).toBe(false);
    });

    test('clicking component does not call `toggleComplete`', () => {
        const component = findByTestAttr(wrapper, 'component-task');

        component.simulate("click");
        expect(mockToggleComplete).toHaveBeenCalledTimes(0);
    });
});