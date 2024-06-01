import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.54)',
    textTransform: 'uppercase',
    transform: 'scale(0.75)',
    transformOrigin: 'top left',
  },
};

export default withStyles(styles)(Typography);
