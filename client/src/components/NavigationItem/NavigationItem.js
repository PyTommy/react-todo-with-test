import React from 'react'
import { NavLink } from 'react-router-dom';

const NavigationItem = props => {
    return (
        <li className="nav-item">
            <NavLink className="nav-link text-secondary font-weight-bold" activeClassName="text-info" to={props.to}>
                {props.children}
            </NavLink>
        </li>
    );
}

export default NavigationItem
