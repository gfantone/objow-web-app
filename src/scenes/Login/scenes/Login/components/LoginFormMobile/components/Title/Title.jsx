import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    fontSize: 35,
    color: '#000000',
  },
};

export default withStyles(styles)(Typography);
