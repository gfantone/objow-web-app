import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Tooltip, Switch } from '@material-ui/core';

const NavigationSwitch = withStyles({
  swicthBase: {
    color: 'rgb(15,111,222)',
    '&$checked': {
      color: 'rgb(15,111,222)',
    },

    '&$checked + $track': {
      backgroundColor: 'rgb(15,111,222)',
    },
  },
  thumb: {
    backgroundColor: 'rgb(15,111,222)',
  },
  checked: {},
  track: {
    backgroundColor: 'rgba(15,111,222, 0.6) !important',
  },
  root: {},
})(({ classes, ...props }) => (
  <Switch
    color="default"
    classes={{
      root: classes.root,
      switchBase: classes.switchBase,
      thumb: classes.thumb,
      track: classes.track,
      checked: classes.checked,
    }}
    {...props}
  />
));

export default NavigationSwitch;
