import React from 'react';
import { Tabs } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    height: 40,
    minHeight: 'initial',
    '& .MuiTab-root': {
      minWidth: 0,
    },
  },
  flexContainer: {
    height: 40,
    '& > button > span': {
      zIndex: '9999',
    },
  },
  indicator: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
};

export default withStyles(styles)((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />
));
