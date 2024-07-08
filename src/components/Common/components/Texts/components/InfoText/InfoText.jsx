import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import tinycolor from 'tinycolor2';
import { ThemeWrapper } from '../../../../../ThemeWrapper';

const getContrastColor = (color) => {
  return tinycolor(color).isDark() && '#FFFFFF';
};

const styles = {
  root: {
    fontSize: 13,
    color: '#999999',
    textTransform: 'uppercase',
  },
  lowercaseRoot: {
    textTransform: 'none',
    fontSize: 14,
    color: '#999999',
  },
};

const InfoText = (props) => {
  const { classes, lowercase, isContrast, style, className, ...otherProps } =
    props;

  const context = useContext(ThemeWrapper.Context);
  const { backgroundColor } = context ? context : {};

  let finalStyle = style;
  if (isContrast) {
    const contrastColor = getContrastColor(backgroundColor);
    finalStyle = { ...style, color: contrastColor };
  }

  const rootClassName = `${lowercase ? classes.lowercaseRoot : classes.root} ${
    className || ''
  }`;

  return (
    <Typography {...otherProps} className={rootClassName} style={finalStyle} />
  );
};

export default withStyles(styles)(InfoText);
