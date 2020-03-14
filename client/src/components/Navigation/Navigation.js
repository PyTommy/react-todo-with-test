import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import classes from './Navigation.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';

const Navigation = props => {
    const isAuthorized = useSelector(state => state.user.id !== undefined);
    const navigationClass = ["nav justify-content-end", classes.Navigation];

    const navItems = isAuthorized ? (
        <Fragment>
            <NavigationItem to="/home">Home</NavigationItem>
            <NavigationItem to="/list">List</NavigationItem>
            <NavigationItem to="/mypage">MyPage</NavigationItem>
        </Fragment>
    ) : (
            <NavigationItem to="/auth">Auth</NavigationItem>
        );

    return (
        <ul className={navigationClass.join(" ")}>
            {navItems}
        </ul>
    )
}


export default Navigation;
