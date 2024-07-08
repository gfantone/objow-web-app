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
    fontSize: 19,
    color: '#555555',
    textTransform: 'uppercase',
  },
};

const BigText = (props) => {
  const { classes, isContrast, style, className, ...otherProps } = props;
  const context = useContext(ThemeWrapper.Context);
  const { backgroundColor } = context ? context : {};

  let finalStyle = style;

  if (isContrast) {
    const contrastColor = getContrastColor(backgroundColor);
    finalStyle = { ...style, color: contrastColor };
  }

  const rootClassName = `${classes.root} ${className || ''}`;

  return (
    <Typography {...otherProps} className={rootClassName} style={finalStyle} />
  );
};

export default withStyles(styles)(BigText);
