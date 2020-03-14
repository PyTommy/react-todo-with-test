import React from 'react'

import useAuthForm from '../../hooks/useAuthForm';
import Input from '../UI/Input/Input';


export const AuthForm = () => {
    const form = useAuthForm();

    const toLoginForm = () => {
        if (form.isSignupForm) {
            form.toggleForm();
        }
    };

    const toSignupForm = () => {
        if (!form.isSignupForm) {
            form.toggleForm();
        }
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        form.submit();
    };

    return (
        <form className="container" onSubmit={onSubmitHandler}>
            <div className="btn-group mb-3 mt-5">
                <button
                    type="button"
                    className={`btn btn-${form.isSignupForm ? 'primary' : 'light'} shadow-none`}
                    onClick={toSignupForm}
                >Signup</button>
                <button
                    type="button"
                    className={`btn btn-${form.isSignupForm ? 'light' : 'primary'} shadow-none`}
                    onClick={toLoginForm}
                >Login</button>
            </div>
            {form.isSignupForm && (
                <div className="form-group">
                    <label >Username</label>
                    <Input
                        required={true}
                        maxLength={30}
                        placeholder="Username"
                        value={form.username.value}
                        identifier="username"
                        isValid={form.username.isValid}
                        invalidMessage={"Should be 1-30 characters"}
                        onChange={form.change} />
                </div>
            )}
            <div className="form-group">
                <label >Email</label>
                <Input
                    required={true}
                    email={true}
                    placeholder="email"
                    value={form.email.value}
                    identifier="email"
                    isValid={form.email.isValid}
                    invalidMessage={"Should be valid email"}
                    onChange={form.change} />
            </div>
            <div className="form-group">
                <label >Password</label>
                <Input
                    required={true}
                    minLength={6}
                    type="password"
                    placeholder="password"
                    value={form.password.value}
                    identifier="password"
                    isValid={form.password.isValid}
                    invalidMessage={"At least 6 letters"}
                    onChange={form.change} />
            </div>
            {form.isSignupForm && (
                <div className="form-group">
                    <label>Confirm Password</label>
                    <Input
                        required={true}
                        minLength={6}
                        type="password"
                        placeholder="Confirm Password"
                        value={form.confirmPassword.value}
                        identifier="confirmPassword"
                        isValid={form.confirmPassword.isValid}
                        invalidMessage={"At least 6 letters"}
                        onChange={form.change} />
                </div>
            )}
            <button type="submit" className="btn btn-primary" disabled={!form.validity}>Submit</button>
        </form>
    )
}

export default AuthForm;