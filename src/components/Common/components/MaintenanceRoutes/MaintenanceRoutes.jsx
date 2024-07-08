import React from 'react';
import { AnonymousLayout } from '../AnonymousLayout';

const MaintenanceRoutes = ({ component: Component, ...props }) => {
  const { path } = props;

  return <AnonymousLayout exact path={path} component={Component} />;
};

export default MaintenanceRoutes;
