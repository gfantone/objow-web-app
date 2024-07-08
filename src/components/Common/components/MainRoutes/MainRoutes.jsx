import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { MainLayout } from '..';
import { I18nWrapper } from '../../../../components';
import * as inAppNotificationCountActions from '../../../../services/InAppNotifications/InAppNotificationCount/actions';

const MainRoutes = ({ component: Component, ...rest }) => {
  const { path } = rest;
  const { account } = rest.accountDetail;
  const context = useContext(I18nWrapper.Context);

  if (!account) {
    return <Redirect to="/login" />;
  } else if (!account.useTermsAccepted || !account.privacyPolicyAccepted) {
    return <Redirect to="/accept-terms" />;
  } else if (account.forceResetPassword) {
    return <Redirect to="/force-reset-password" />;
  }

  if (account.locale) {
    context.selectLanguage(account.locale);
  } else if (localStorage.getItem('locale')) {
    context.selectLanguage(localStorage.getItem('locale'));
  }

  rest.inAppNotificationCountActions.countNewInAppNotification();

  return <MainLayout exact path={path} component={Component} />;
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

const mapDispatchToProps = (dispatch) => ({
  inAppNotificationCountActions: bindActionCreators(
    inAppNotificationCountActions,
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainRoutes);
