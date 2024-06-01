import React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    textTransform: 'uppercase',
    fontSize: 13,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 13,
  },
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
  ...props
}) => {
  const { classes } = props;
  const [value, setValue] = React.useState(initial);

  const handleChange = (event) => {
    const value =
      !emptyText ||
      event.currentTarget.value != emptyText.toString().toUpperCase()
        ? event.currentTarget.value
        : null;
    setValue(value);
    if (props.onChange) props.onChange(value);
  };

  return (
    <div>
      <FormControl fullWidth={fullWidth}>
        <InputLabel shrink={true} className={classes.label}>
          {label}
        </InputLabel>
        <Select
          native
          disabled={disabled}
          fullWidth={fullWidth}
          name={name}
          onChange={handleChange}
          value={value}
          classes={{ root: classes.root }}
        >
          {!emptyDisabled && !emptyText && <option></option>}
          {!emptyDisabled && emptyText && (
            <option>{emptyText.toString().toUpperCase()}</option>
          )}
          {options != null &&
            options.map((option, index) => {
              return (
                <option key={index} value={option[optionValueName]}>
                  {optionTextPrefix}
                  {option[optionTextName].toString().toUpperCase()}
                </option>
              );
            })}
        </Select>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(CustomSelect);
