import React from 'react';
import {Route} from "react-router-dom";

import {UserLayout} from './index';
<<<<<<< HEAD
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

=======
import {GuestLayout} from '../GuestLayout';
import {AuthProvider} from '../../../../auth';

const UserRoutes = ({component: Component, useGuestLayout = false, ...rest}) => {
>>>>>>> dev
    const Layout = !useGuestLayout ? UserLayout : GuestLayout;

    return (
        <Route
            {...rest}
            render={props => (
<<<<<<< HEAD
                <Layout component={Component} {...props}/>
=======
                <AuthProvider>
                    <Layout component={Component} {...props}/>
                </AuthProvider>
>>>>>>> dev
            )}
        />
    );
};

export default UserRoutes;
