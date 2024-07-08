import React from 'react';
import { Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  badge: {
    right: 17,
    fontSize: '12px !important',
  },
  colorSecondary: {
    color: '#FFFFFF',
    backgroundColor: '#E50000',
  },
};

export default withStyles(styles)(Badge);
