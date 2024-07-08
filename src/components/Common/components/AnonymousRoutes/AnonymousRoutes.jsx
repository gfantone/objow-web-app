import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { I18nWrapper } from '../../../../components';
import { AnonymousLayout, AnonymousLayoutMobile } from '../AnonymousLayout';

const AnonymousRoutes = ({ component: Component, ...props }) => {
  const { path } = props;
  const { account } = props.accountDetail;
  const context = useContext(I18nWrapper.Context);

  if (account) {
    if (!account.useTermsAccepted || !account.privacyPolicyAccepted) {
      return <Redirect to='/accept-terms' />;
    }

    if (account.forceResetPassword) {
      return <Redirect to='/force-reset-password' />;
    }

    return <Redirect to='/' />;
  }

  if (localStorage.getItem('locale')) {
    context.selectLanguage(localStorage.getItem('locale'));
  }

  const { detect } = require('detect-browser');
  const browser = detect();
  const isMobileApp =
    browser.name === 'ios-webview' || browser.name === 'chromium-webview';

  if (!isMobileApp) {
    return <AnonymousLayout exact path={path} component={Component} />;
  } else {
    return <AnonymousLayoutMobile exact path={path} component={Component} />;
  }
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(AnonymousRoutes);
