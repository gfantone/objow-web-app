import React from 'react';
import {Route} from "react-router-dom";

import {UserLayout} from './index';
import {GuestLayout} from '../GuestLayout';
import {AuthProvider} from '../../../../auth';

const UserRoutes = ({component: Component, useGuestLayout = false, ...rest}) => {
    const Layout = !useGuestLayout ? UserLayout : GuestLayout;

    return (
        <Route
            {...rest}
            render={props => (
                <AuthProvider>
                    <Layout component={Component} {...props}/>
                </AuthProvider>
            )}
        />
    );
};

export default UserRoutes;
