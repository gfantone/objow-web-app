import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Redirect} from 'react-router-dom'
import {MainLayout} from '..'
import * as inAppNotificationCountActions from '../../../../services/InAppNotifications/InAppNotificationCount/actions'

const MainRoutes = ({component: Component, ...rest}) => {
    const { path } = rest;
    const { account } = rest.accountDetail;

    if (!account) {
        return <Redirect to='/login' />;
    } else if (!account.useTermsAccepted || !account.privacyPolicyAccepted) {
        return <Redirect to='/accept-terms' />
    }

    rest.inAppNotificationCountActions.countNewInAppNotification()

    return (
        <MainLayout exact path={path} component={Component} />
    )
};

const mapStateToProps = ({ accountDetail }) => ({
    accountDetail
});

const mapDispatchToProps = (dispatch) => ({
    inAppNotificationCountActions: bindActionCreators(inAppNotificationCountActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MainRoutes)
