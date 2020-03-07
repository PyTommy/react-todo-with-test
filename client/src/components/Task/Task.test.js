import React from 'react';
import { shallow } from 'enzyme';

import Task from './Task';
import { findByTestAttr, checkProps } from '../../../test/testUtils';

let wrapper, mockToggleComplete, mockOnClickEdit, mockOnClickDelete, appliedProps;

const setup = (props) => {
    mockToggleComplete = jest.fn();
    mockOnClickEdit = jest.fn();
    mockOnClickDelete = jest.fn();

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
        onClickEdit: mockOnClickEdit,
        onClickDelete: mockOnClickDelete
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
        expect(taskButtons.hasClass('buttonsHidden')).toBe(true);
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
        expect(taskButtons.hasClass(/.*buttonsShown.*/)).toBe(true);
    });


    test('clicking component does not call `toggleComplete`', () => {
        const component = findByTestAttr(wrapper, 'component-task');

        component.simulate("click");
        expect(mockToggleComplete).toHaveBeenCalledTimes(0);
    });

    test('clicking edit button call `onClickEdit`', () => {
        const taskEdit = findByTestAttr(wrapper, 'task-edit');
        taskEdit.simulate('click');
        expect(mockOnClickEdit).toHaveBeenCalledTimes(1);
    });

    test('clicking delete button call `onClickDelete`', () => {
        const taskEdit = findByTestAttr(wrapper, 'task-delete');
        taskEdit.simulate('click');
        expect(mockOnClickDelete).toHaveBeenCalledTimes(1);
    });
});

describe('task is completed', () => {
    beforeEach(() => {
        setup({
            task: {
                id: 1,
                title: 'Studying test for react',
                completed: true,
                date: new Date(2020, 0, 2),
                userId: 1,
            }
        });
    });

    test('task title `titleCompleted`', () => {
        const taskTitle = findByTestAttr(wrapper, 'task-title');
        expect(taskTitle.hasClass('titleCompleted')).toBe(true);
    });
});