import React from 'react';
import { Redirect } from 'react-router-dom';
import { AnonymousLayout } from '../AnonymousLayout';
import { connect } from 'react-redux';

const IntermediateRoutes = ({ component: Component, ...props }) => {
  const { path } = props;
  const { account } = props.accountDetail;

  if (!account) {
    return <Redirect to="/login" />;
  }

  if (
    account &&
    account.useTermsAccepted &&
    account.privacyPolicyAccepted &&
    !account.forceResetPassword
  ) {
    return <Redirect to="/" />;
  }
  if (
    account &&
    (!account.useTermsAccepted || !account.privacyPolicyAccepted) &&
    path !== '/accept-terms'
  ) {
    return <Redirect to="/accept-terms" />;
  }

  if (
    account &&
    account.useTermsAccepted &&
    account.privacyPolicyAccepted &&
    account.forceResetPassword &&
    path !== '/force-reset-password'
  ) {
    return <Redirect to="/force-reset-password" />;
  }

  return <AnonymousLayout exact path={path} component={Component} />;
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(IntermediateRoutes);
