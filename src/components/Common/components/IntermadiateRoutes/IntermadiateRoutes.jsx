import React from 'react'
import {Redirect} from "react-router-dom";
import {AnonymousLayout} from "../AnonymousLayout";
import {connect} from "react-redux";

const IntermediateRoutes = ({ component: Component, ...props }) => {
    const { path } = props;
    const { account } = props.auth;

    if (account && account.useTermsAccepted && account.privacyPolicyAccepted) {
        return <Redirect to='/' />
    } if (!account) {
        return <Redirect to='/login' />
    }

    return <AnonymousLayout exact path={path} component={Component} />
};

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(mapStateToProps)(IntermediateRoutes)
