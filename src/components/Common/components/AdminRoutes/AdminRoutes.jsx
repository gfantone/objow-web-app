import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {MainLayout} from '..'

const AdminRoutes = ({ component: Component, ...rest }) => {
    const { path } = rest;
    const { account } = rest.auth;

    if (!account) {
        return <Redirect to='/login' />;
    }

    const isAdministrator = account.role.code == 'A'

    if (!isAdministrator) {
        return <Redirect to='/' />
    }

    return (
        <MainLayout exact path={path} component={Component} />
    )
}

const mapStateToProps = ({auth}) => ({
    auth
})

export default connect(mapStateToProps)(AdminRoutes)
