import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 50,
    height: 1,
    backgroundColor: '#00E58D',
  },
};

const Divider = ({ ...props }) => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <div className={classes.divider}></div>
    </div>
  );
};

export default withStyles(styles)(Divider);
