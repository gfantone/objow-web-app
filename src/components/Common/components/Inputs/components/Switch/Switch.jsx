import React, { useContext, useEffect } from 'react';
import { withFormsy } from 'formsy-react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import tinycolor from 'tinycolor2';
import { ThemeWrapper } from '../../../../../ThemeWrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    color: 'red',
    margin: theme.spacing(1),
  },
  label: {
    fontSize: 15,
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: theme.palette.primary.main,
      border: '6px solid #fff',
    },
  },
  switchBaseLight: {
    padding: 1,
    '& + $track': {
      backgroundColor: '#ddd',
    },
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: theme.palette.primary.main,
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid rgba(0, 0, 0, 0.08)`,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}));

const CustomSwitch = ({
  disabled,
  initial = false,
  label,
  name,
  onChange,
  labelClass,
  lightTheme,
  isContrast,
  style: externalStyle,
  ...props
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(initial);
  const context = useContext(ThemeWrapper.Context);
  const { backgroundColor } = context ? context : {};
  const getContrastColor = (color) => {
    return tinycolor(color).isDark() && '#FFFFFF';
  };

  useEffect(() => {
    props.setValue(initial);
  }, []);

  const handleChange = (event) => {
    const value = event.currentTarget.checked;
    props.setValue(value);
    setValue(value);
    if (onChange) onChange(value);
  };

  const finalStyle = isContrast
    ? { ...externalStyle, color: getContrastColor(backgroundColor) }
    : externalStyle;

  return (
    <div>
      <FormControlLabel
        label={label}
        classes={{ label: labelClass || classes.label }}
        style={finalStyle}
        control={
          <Switch
            name={name}
            checked={value}
            disabled={disabled}
            onChange={handleChange}
            classes={{
              root: classes.root,
              switchBase: lightTheme
                ? classes.switchBaseLight
                : classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
              focusVisible: classes.focusVisible,
            }}
          />
        }
      />
    </div>
  );
};

export default withFormsy(CustomSwitch);
