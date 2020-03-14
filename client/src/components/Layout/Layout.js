import React, { Fragment } from 'react';
import Navigation from '../Navigation/Navigation';
import variables from '../../sharedStyle/variables.scss';

const Layout = (props) => {
    return (
        <Fragment>
            <Navigation />
            <main style={{ marginTop: variables.navHeight }}>
                {props.children}
            </main>
        </Fragment>
    );
};


export default Layout;