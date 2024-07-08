import React, { useEffect, useState, useContext } from 'react';
import { withFormsy } from 'formsy-react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import tinycolor from 'tinycolor2';
import { ThemeWrapper } from '../../../../../ThemeWrapper';

const styles = (theme) => {
  return {
    root: {
      textTransform: 'none',
      fontSize: 14,
    },
    rootSmall: {},
    bigLabel: {
      fontSize: '16px !important',
      textAlign: 'center',
      transform: 'none',
      width: '100%',
      top: '-5px',
    },
    label: {
      textTransform: 'none',
      // textTransform: 'uppercase',
      fontSize: 16,
    },
    colorContrastSvg: {
      '& .MuiSelect-icon': {
        color: '#FFFFFF !important',
      },
      '& .MuiInput-underline:after': {
        borderBottom: '2px solid #FFFFFF',
      },
    },
  };
};

const CustomSelect = ({
  disabled,
  emptyDisabled = false,
  emptyText,
  error,
  fullWidth,
  initial = null,
  label,
  name,
  options,
  optionValueName,
  optionTextName,
  optionTextPrefix = null,
  required,
  updateInitial,
  bigLabel,
  children,
  isContrast,
  ...props
}) => {
  const { classes } = props;
  const [value, setValue] = useState(initial);
  const hasError = props.isFormSubmitted && !props.isValid;
  const errorMessage = hasError ? props.errorMessage : null;
  const finalLabel = label ? (required ? `${label} *` : label) : null;
  const context = useContext(ThemeWrapper.Context);
  const { backgroundColor } = context ? context : {};

  useEffect(() => {
    props.setValue(initial);
    if (updateInitial) setValue(initial);
  }, [initial]);

  const handleChange = (event) => {
    const value =
      !emptyText || event.currentTarget.value != emptyText.toString()
        ? event.currentTarget.value
        : null;
    setValue(value);
    props.setValue(value);
    if (props.onChange) props.onChange(value);
  };
  const getContrastColor = (color) => {
    return tinycolor(color).isDark() && '#FFFFFF';
  };
  return (
    <div>
      <FormControl fullWidth={fullWidth}>
        <InputLabel
          shrink={!bigLabel}
          error={hasError}
          className={`${classes.label} ${bigLabel ? classes.bigLabel : ''}`}
          style={{
            color: isContrast && getContrastColor(backgroundColor),
          }}
        >
          {finalLabel}
        </InputLabel>
        <Select
          native
          disabled={disabled}
          fullWidth={fullWidth}
          name={name}
          onChange={handleChange}
          value={value}
          error={hasError}
          style={{
            color: isContrast && getContrastColor(backgroundColor),
          }}
          classes={{
            root: `${classes.root} ${bigLabel ? classes.rootSmall : ''}`,
            icon: isContrast && classes.colorContrastSvg,
          }}
        >
          {children}
          {!emptyDisabled && !emptyText && <option></option>}
          {!emptyDisabled && emptyText && (
            <option>{emptyText.toString()}</option>
          )}
          {options != null &&
            options.map((option, index) => {
              return (
                <option key={index} value={option[optionValueName]}>
                  {optionTextPrefix}
                  {option[optionTextName].toString()}
                </option>
              );
            })}
        </Select>
        <FormHelperText
          error={hasError}
          style={{
            color: isContrast && getContrastColor(backgroundColor),
          }}
        >
          {errorMessage}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(withFormsy(CustomSelect));
