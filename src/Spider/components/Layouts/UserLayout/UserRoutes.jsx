import React from 'react';
import {Route} from "react-router-dom";

import {UserLayout} from './index';
import {GuestLayout} from "../GuestLayout";
import {useAuth} from '../../../../auth';

const UserRoutes = ({component: Component, useGuestLayout = false, ...rest}) => {
    const {login, user} = useAuth();

    const {path} = rest;

    if (!user) {
        const encodedPath = encodeURIComponent(path);
        const redirectUri = `${window.location.origin}/callback?redirect=${encodedPath}`;
        login(redirectUri);
        return null;
    }

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
