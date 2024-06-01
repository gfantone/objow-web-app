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
    fontSize: 15,
    color: '#555555',
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  lowercaseRoot: {
    textTransform: 'none',
    fontSize: 18,
    color: '#555555',
    fontWeight: '800',
  },
};

const DefaultTitle = (props) => {
  const {
    classes,
    lowercase,
    isContrast,
    style: externalStyle,
    className,
    ...otherProps
  } = props;
  const context = useContext(ThemeWrapper.Context);
  const { backgroundColor } = context ? context : {};

  let finalStyle = isContrast
    ? { ...externalStyle, color: getContrastColor(backgroundColor) }
    : externalStyle;

  const rootClassName = `${lowercase ? classes.lowercaseRoot : classes.root} ${
    className || ''
  }`;

  return (
    <Typography {...otherProps} className={rootClassName} style={finalStyle} />
  );
};

export default withStyles(styles)(DefaultTitle);
