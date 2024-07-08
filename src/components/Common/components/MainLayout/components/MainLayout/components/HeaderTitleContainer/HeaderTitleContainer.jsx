import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flex: 'auto',
  },
});

const HeaderTitleContainer = ({ ...props }) => {
  const classes = useStyles();

  return <div className={classes.container}>{props.children}</div>;
};

export default HeaderTitleContainer;
