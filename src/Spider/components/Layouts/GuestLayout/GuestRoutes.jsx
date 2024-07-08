import React from 'react';
import { GuestLayout } from './index';
import { Route } from 'react-router-dom';

const GuestRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (
                <GuestLayout component={Component} {...props} />
            )}
        />
    );
};

export default GuestRoutes;
