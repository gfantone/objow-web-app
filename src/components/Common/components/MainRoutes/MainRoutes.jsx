import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {MainLayout} from '..'

const MainRoutes = ({component: Component, ...rest}) => {
    const { path } = rest;
    const { account } = rest.accountDetail;

    if (!account) {
        return <Redirect to='/login' />;
    } else if (!account.useTermsAccepted || !account.privacyPolicyAccepted) {
        return <Redirect to='/accept-terms' />
    }

    return (
        <MainLayout exact path={path} component={Component} />
    )
};

const mapStateToProps = ({ accountDetail }) => ({
    accountDetail
});

export default connect(mapStateToProps)(MainRoutes)
