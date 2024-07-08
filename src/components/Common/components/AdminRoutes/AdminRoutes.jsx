import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { MainLayout } from '..';
import { I18nWrapper } from '../../../../components';

const AdminRoutes = ({ component: Component, ...rest }) => {
  const { path } = rest;
  const { account } = rest.accountDetail;
  const context = useContext(I18nWrapper.Context);

  if (!account) {
    return <Redirect to="/login" />;
  }

  const isAdministrator = account.role.code == 'A';

  if (!isAdministrator) {
    return <Redirect to="/" />;
  }

  if (account.locale) {
    context.selectLanguage(account.locale);
  } else if (localStorage.getItem('locale')) {
    context.selectLanguage(localStorage.getItem('locale'));
  }

  return <MainLayout exact path={path} component={Component} />;
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(AdminRoutes);
