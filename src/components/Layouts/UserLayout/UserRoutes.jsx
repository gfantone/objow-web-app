import React from 'react';
import { UserLayout } from '.';

const UserRoutes = ({ component: Component, ...rest }) => {
    const { path } = rest;

    return <UserLayout exact path={path} component={Component} />;
};

export default UserRoutes;
