import React from 'react';
import { Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
  return {
    root: {
      paddingTop: 16,
      paddingBottom: 16,
      backgroundColor: theme.palette.background.default,
    },
    rootClean: {
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: theme.palette.background.default,
    },
  };
};

const CustomContainer = ({ classes, ...props }) => {
  return (
    <Container
      {...props}
      classes={{
        root: props.maxWidth === false ? classes.rootClean : classes.root,
      }}
    />
  );
};

export default withStyles(styles)(CustomContainer);
