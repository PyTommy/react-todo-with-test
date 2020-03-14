import React from 'react';
import { mount, shallow } from 'enzyme';

import TaskForm from './TaskForm';
import DropdownCalender from '../DropdownCalender/DropdownCalender';
import { findByTestAttr } from '../../../test/testUtils';

let wrapper;


describe('<TaskForm /> renders', () => {
    const setup = () => {
        wrapper = shallow(<TaskForm />);
    };

    beforeEach(setup);

    test('data-test="component-TaskForm "', () => {
        const component = findByTestAttr(wrapper, 'component-TaskForm ');

        expect(component.length).toBe(1);
    });

    test('data-test="TaskForm -title"', () => {
        const titleInput = findByTestAttr(wrapper, 'TaskForm -title');
        expect(titleInput.length).toBe(1);
    });

    test('data-test="TaskForm -date"', () => {
        const date = findByTestAttr(wrapper, 'TaskForm -date');
        expect(date.length).toBe(1);
    });

    test('renders data-test="TaskForm -submit"', () => {
        const submitButton = findByTestAttr(wrapper, 'TaskForm -submit');
        expect(submitButton.length).toBe(1);
    });

    test('renders <DropdownCalender />', () => {
        const calenderComponent = wrapper.find(DropdownCalender);
        expect(calenderComponent.length).toBe(1);
    });
});

describe('onClick events on <TaskForm  />', () => {

});

describe('onChange events on <TaskForm  />', () => {

});