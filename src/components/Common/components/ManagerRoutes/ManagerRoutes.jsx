import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { MainLayout } from '..'

const ManagerRoutes = ({ component: Component, ...rest }) => {
    const { path } = rest;
    const { account } = rest.accountDetail;

    if (!account) {
        return <Redirect to='/login' />;
    }

    const isManager = account.role.code == 'M' || account.role.code == 'A';

    if (!isManager) {
        return <Redirect to='/' />
    }

    return (
        <MainLayout exact path={path} component={Component} />
    )
};

const mapStateToProps = ({ accountDetail }) => ({
    accountDetail
});

export default connect(mapStateToProps)(ManagerRoutes)
