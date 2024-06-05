import React from 'react';
import { GuestLayout } from '.';

const GuestRoutes = ({ component: Component, ...rest }) => {
    const { path } = rest;

    return <GuestLayout exact path={path} component={Component} />;
};

export default GuestRoutes;
