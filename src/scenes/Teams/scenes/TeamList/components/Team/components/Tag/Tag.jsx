import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    color: '#FFFFFF',
    fontSize: 11,
    paddingLeft: 8,
    paddingTop: 2,
    paddingRight: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
};

const Tag = ({ players, color, ...props }) => {
  const { children, classes } = props;

  return (
    <Typography className={classes.root} style={{ backgroundColor: color }}>
      {children}
    </Typography>
  );
};

export default withStyles(styles)(Tag);
