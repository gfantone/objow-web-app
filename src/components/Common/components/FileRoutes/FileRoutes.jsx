import React from 'react';
import { FileLayout } from '..';

const FileRoutes = ({ component: Component, ...rest }) => {
  const { path } = rest;

  return <FileLayout exact path={path} component={Component} />;
};

export default FileRoutes;
