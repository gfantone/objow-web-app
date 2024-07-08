import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Button } from '..';
import tinycolor from 'tinycolor2';
import { ThemeWrapper } from '../../../../../ThemeWrapper';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    color: '#FFFFFF',
  },
  redButton: {
    backgroundColor: '#E50000',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#E50000',
    },
  },
};

const ProgressButton = ({
  disabled = false,
  type = '',
  text = '',
  fullWidth = false,
  color = 'default',
  loading = false,
  centered = false,
  onClick,
  ...props
}) => {
  const { classes } = props;
  const rootClassName = centered ? classes.root : '';
  // const context = useContext(ThemeWrapper.Context);
  // // const { backgroundColor } = context ? context : {};
  // // const getContrastColor = (backgroundColor) => {
  // //   return tinycolor(backgroundColor).isDark();
  // // };

  return (
    <div className={rootClassName}>
      <Button
        fullWidth={fullWidth}
        type={type}
        disabled={loading || disabled}
        color={color}
        onClick={onClick}
      >
        {!loading && text}
        {loading && <CircularProgress size={24} className={classes.loader} />}
      </Button>
    </div>
  );
};

export default withStyles(styles)(ProgressButton);
