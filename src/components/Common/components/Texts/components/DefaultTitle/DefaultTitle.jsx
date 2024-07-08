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
  },
  lowercaseRoot: {
    fontSize: 17,
    textTransform: 'none',
    color: '#555555',
  },
  boldRoot: {
    fontWeight: 'bold',
  },
};

const DefaultTitle = (props) => {
  const {
    classes,
    lowercase,
    bold,
    isContrast,
    style,
    className,
    ...otherProps
  } = props;
  const context = useContext(ThemeWrapper.Context);
  const { backgroundColor } = context ? context : {};

  let finalStyle = style;

  if (isContrast) {
    const contrastColor = getContrastColor(backgroundColor);
    finalStyle = { ...style, color: contrastColor };
  }
  const rootClassName = `${lowercase ? classes.lowercaseRoot : classes.root} ${
    bold ? classes.boldRoot : ''
  } ${className || ''}`;

  return (
    <Typography {...otherProps} className={rootClassName} style={finalStyle} />
  );
};

export default withStyles(styles)(DefaultTitle);
