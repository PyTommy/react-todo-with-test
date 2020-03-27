import React from 'react';
import { shallow } from 'enzyme';

import TaskForm from './TaskForm';
import DropdownCalender from '../DropdownCalender/DropdownCalender';
import Input from '../UI/Input/Input';
import { findByTestAttr } from '../../../test/testUtils';
import useTaskForm from '../../hooks/useTaskForm';

jest.mock('../../hooks/useTaskForm');



let wrapper;

// Mock useTaskForm
const mockForm = {
    title: {
        value: "abc",
        isValid: true
    },
    date: {
        value: new Date(2020, 0, 2),
        isValid: true,
    },
    validity: true,
    change: jest.fn(),
    submit: jest.fn()
};
useTaskForm.mockImplementation(() => mockForm);

const setup = () => {
    mockForm.change.mockClear();
    mockForm.submit.mockClear();
    wrapper = shallow(<TaskForm />);
};

beforeEach(setup);
describe('<TaskForm /> renders', () => {

    test('"component-TaskForm"', () => {
        const component = findByTestAttr(wrapper, "component-TaskForm");
        expect(component.length).toBe(1);
    });

    test('"show-date"', () => {
        const showDate = findByTestAttr(wrapper, "show-date");
        expect(showDate.length).toBe(1);
    });

    test('<DropdownCalender />', () => {
        const dropDownCalender = wrapper.find(DropdownCalender);
        expect(dropDownCalender.length).toBe(1);
    });

    test('<Input />', () => {
        const input = wrapper.find(Input);
        expect(input.length).toBe(1);
    });

    test('"submit-btn"', () => {
        const submitBtn = findByTestAttr(wrapper, 'submit-btn');
        expect(submitBtn.length).toBe(1);
    });
});

describe('onClick events on <TaskForm  />', () => {
    test('Click show-date toggle showCalender', () => {
        // Initially not shown
        expect(wrapper.find(DropdownCalender).prop("show")).toBe(false);

        // Click "show-date"
        const showDate = findByTestAttr(wrapper, 'show-date');
        showDate.simulate('click');

        // DropdownCalender shown
        expect(wrapper.find(DropdownCalender).prop("show")).toBe(true);
    });

    test('Clicking submit-btn cause submission if form.validity true', () => {
        setup(true);

        const submitBtn = findByTestAttr(wrapper, 'submit-btn');
        submitBtn.simulate('click', {
            preventDefault: () => { }
        });

        expect(mockForm.submit).toHaveBeenCalledTimes(1);
    });
});

describe('onChange events on <TaskForm  />', () => {

});