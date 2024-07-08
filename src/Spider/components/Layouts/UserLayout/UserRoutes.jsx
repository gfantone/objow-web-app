import React from 'react';
import {Route} from "react-router-dom";

import {UserLayout} from './index';
import {GuestLayout} from "../GuestLayout";

const UserRoutes = ({component: Component, useGuestLayout = false, ...rest}) => {
    const Layout = !useGuestLayout ? UserLayout : GuestLayout;

    return (
        <Route
            {...rest}
            render={props => (
                <Layout component={Component} {...props}/>
            )}
        />
    );
};

export default UserRoutes;
