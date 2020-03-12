import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../../test/testUtils';

import Input from './Input';

// Global variables
let wrapper;
const mockOnChange = jest.fn();

const defaultProps = {
    identifier: "title",
    onChange: mockOnChange,
    value: "abc"
};

const setup = (props = {}) => {
    mockOnChange.mockClear();
    wrapper = shallow(<Input {...defaultProps} {...props} />);
};

describe('Renders', () => {
    beforeEach(setup);

    test('<Input />', () => {
        const component = findByTestAttr(wrapper, 'component-input');
        expect(component.exists()).toBe(true);
    });

    test('<input/>', () => {
        const elInput = findByTestAttr(wrapper, 'element-input');
        expect(elInput.exists()).toBe(true);
    });
});

test('check props', () => {
    const confirmingProps = {
        placeholder: "string",
        identifier: "string",
        value: "anything",
        onChange: () => { },
        isValid: true,
        invalidMessage: "string",
        className: "string",
        style: {},

        required: true,
        email: true,
        minLength: 10,
        maxLength: 100,
        min: 1,
        max: 5,
        numeric: true,
    };

    checkProps(Input, confirmingProps);
});


describe('Invalid message', () => {
    test('does not render invalid message', () => {
        setup({ isValid: false, invalidMessage: "aaa" });
        const elInvalidMessage = findByTestAttr(wrapper, 'invalid-message');

        expect(elInvalidMessage.exists()).toBe(false);
    });

    test('Render invalid message if input with invalid value blurred', () => {
        setup({ isValid: false, invalidMessage: "aaa" });

        // Blur invalid input
        const elInput = findByTestAttr(wrapper, 'element-input');
        elInput.simulate('blur');


        const elInvalidMessage = findByTestAttr(wrapper, 'invalid-message');
        expect(elInvalidMessage.exists()).toBe(true);
    });
});

describe('onChange with valid value', () => {
    const setupAndChange = (props, value) => {
        mockOnChange.mockClear();
        wrapper = shallow(<Input {...defaultProps} {...props} />);

        // find input element
        let elInput = findByTestAttr(wrapper, 'element-input');

        // simulate change
        const event = { target: { value: value } };
        elInput.simulate('change', event);

        const [identifier, newValue, isValid] = mockOnChange.mock.calls[0];

        expect(identifier).toBe(defaultProps.identifier);
        expect(isValid).toBe(true);

        return newValue;
    };

    test('required', () => {
        const value = setupAndChange(
            { required: true },
            "abc"
        );
        expect(value).toBe("abc");
    });

    test('numeric', () => {
        const value = setupAndChange(
            { numeric: true },
            "000001"
        );
        expect(value).toBe("1");
    });

    test('email', () => {
        const value = setupAndChange(
            { email: true },
            "test@test.com"
        );
        expect(value).toBe("test@test.com");
    });

    test('minLength', () => {
        const value = setupAndChange(
            { minLength: 8 },
            "12345678"
        );
        expect(value).toBe("12345678");
    });

    test('maxLength', () => {
        const value = setupAndChange(
            { maxLength: 8 },
            "12345678"
        );
        expect(value).toBe("12345678");
    });

    test('min', () => {
        const value = setupAndChange(
            { min: 8 },
            "8"
        );
        expect(value).toBe("8");
    });

    test('max', () => {
        const value = setupAndChange(
            { max: 8 },
            "8"
        );
        expect(value).toBe("8");
    });
});


describe('onChange with invalid value', () => {
    const setupAndChange = (props, value) => {
        mockOnChange.mockClear();
        wrapper = shallow(<Input {...defaultProps} {...props} />);

        // find input element
        let elInput = findByTestAttr(wrapper, 'element-input');

        // simulate change
        const event = { target: { value: value } };
        elInput.simulate('change', event);

        const [identifier, newValue, isValid] = mockOnChange.mock.calls[0];

        expect(identifier).toBe(defaultProps.identifier);
        expect(isValid).toBe(false);

        return newValue;
    };

    test('required', () => {
        const value = setupAndChange(
            { required: true },
            ""
        );
        expect(value).toBe("");
    });

    test('numeric', () => {
        const value = setupAndChange(
            { numeric: true, required: true },
            "aaaaa"
        );
        expect(value).toBe("");
    });

    test('email', () => {
        const value = setupAndChange(
            { email: true },
            "test.com"
        );
        expect(value).toBe("test.com");
    });

    test('minLength', () => {
        const value = setupAndChange(
            { minLength: 10 },
            "123"
        );
        expect(value).toBe("123");
    });

    test('maxLength', () => {
        const value = setupAndChange(
            { maxLength: 10 },
            "123456789012345"
        );
        expect(value).toBe("123456789012345");
    });

    test('min', () => {
        const value = setupAndChange(
            { min: 10 },
            "8"
        );
        expect(value).toBe("8");
    });

    test('max', () => {
        const value = setupAndChange(
            { max: 10 },
            "11"
        );
        expect(value).toBe("11");
    });
});