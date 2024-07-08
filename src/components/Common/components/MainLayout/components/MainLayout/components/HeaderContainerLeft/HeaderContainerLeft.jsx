import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    left: '24px',
  },
});

const HeaderContainerLeft = ({ ...props }) => {
  const classes = useStyles();

  return <div className={classes.container}>{props.children}</div>;
};

export default HeaderContainerLeft;
