import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { MainLayout } from '..';

const SuperManagerRoutes = ({ component: Component, ...rest }) => {
  const { path } = rest;
  const { account } = rest.accountDetail;

  if (!account) {
    return <Redirect to="/login" />;
  }

  const isAdministrator =
    account.role.code === 'A' || account.role.code === 'S';

  if (!isAdministrator) {
    return <Redirect to="/" />;
  }

  return <MainLayout exact path={path} component={Component} />;
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(SuperManagerRoutes);
