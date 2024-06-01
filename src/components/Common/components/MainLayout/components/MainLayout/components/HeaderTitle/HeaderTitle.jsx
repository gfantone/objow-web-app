import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import tinycolor from 'tinycolor2';

const getContrastColor = (color) => {
  return tinycolor(color).isDark() && '#FFFFFF';
};

const styles = {
  root: {
    fontSize: 20,
    fontWeight: 'bold',
  },
};

const HeaderTitle = ({ classes, secondaryColor, children }) => {
  return (
    <Typography
      className={classes.root}
      style={{ color: getContrastColor(secondaryColor) }}
    >
      {children}
    </Typography>
  );
};

export default withStyles(styles)(HeaderTitle);
