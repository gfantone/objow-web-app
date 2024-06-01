import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    fontFamily: 'Avenir, sans-serif',
    color: '#2b2e45',
    fontSize: '5vh',
    textSizeAdjust: 'none',
    fontWeight: 900,
    lineHeight: 1.2,
    backgroundImage:
      'linear-gradient(104deg, #2b2e45, #263452 29%, #055ea9 48%, #09dd93 79%, #00e094)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
};

const LoginText = (props) => (
  <Typography {...props} classes={{ root: props.classes.root }} />
);

export default withStyles(styles)(LoginText);
