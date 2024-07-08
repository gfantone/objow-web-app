import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 1,
    paddingLeft: 8,
    paddingTop: 3,
    paddingBottom: 2,
    paddingRight: 8,
    textAlign: 'center',
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
