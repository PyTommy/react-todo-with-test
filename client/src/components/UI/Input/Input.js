import React, { useState } from 'react'
import PropTypes from 'prop-types';

/**
 * 
 * @param {object} props
 * Properties
 * @property {string} placeholder - (optional)
 * @property {string} identifier  - Passed as first param of onChangeText.
 * @property {function} onChange - Identifier, value, isValid will be passed as param.
 * @property {object} className - Customize class (optional)
 * @property {object} style - Customize style (optional)
 * Validation
 * @property {boolean} isValid - (optional)
 * @property {string} invalidMessage - shown when invalid and already touched.(optional) 
 * @property {boolean} required - (optional)
 * @property {boolean} email - (optional)
 * @property {boolean} numeric - Only /[0-9]/ are allowed inside textInput. (optional)
 * @property {number} minLength (optional)
 * @property {number} maxLength (optional)
 * @property {number} min - Minimum number. (optional)
 * @property {number} max - Maximum number.(optional)
 */
const Input = (props) => {
    const {
        placeholder = "",
        identifier,
        value,
        onChange,
        isValid,
        invalidMessage,
        className,
        style,

        required,
        email,
        minLength,
        maxLength,
        min,
        max,
        numeric,
    } = props;

    const [isBlurred, setIsBlurred] = useState(false);

    const onChangeHandler = e => {
        let value = e.target.value;

        // Validity
        if (numeric) {
            value = value.replace(/[^0-9]/g, '');

            // Remove 0 on the head. Example) '02' => '2'
            if (value.match(/0[0-9]+/)) {
                value = (+value).toString();
            }
        }

        let validity = true;
        if (required && value.trim().length === 0) {
            validity = false;
        }
        const validateEmail = (email) => {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };
        if (email && !validateEmail(value)) {
            validity = false;
        }
        if (minLength != undefined && value.length < minLength) {
            validity = false;
        }
        if (maxLength != undefined && value.length > maxLength) {
            validity = false;
        }
        if (min != undefined && +value < min) {
            validity = false;
        }
        if (max != undefined && +value > max) {
            validity = false;
        }

        onChange(identifier, value, validity);
    };

    const onBlurHandler = () => {
        if (!isBlurred) {
            setIsBlurred(true);
        }
    };

    return (
        <div data-test="component-input">
            <input
                className={["form-control shadow-none", className].join(" ")}
                style={style}
                placeholder={placeholder}
                value={value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                data-test="element-input" />
            {invalidMessage && isBlurred && !isValid && (
                <span
                    className="text-danger pl-2"
                    data-test="invalid-message">{invalidMessage}
                </span>
            )}
        </div>
    )
}

Input.propTypes = {
    placeholder: PropTypes.string,
    identifier: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    isValid: PropTypes.bool,
    invalidMessage: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    required: PropTypes.bool,
    email: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    numeric: PropTypes.bool,
};

export default Input