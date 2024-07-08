import React, { useEffect } from 'react';
import { withFormsy } from 'formsy-react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    '& label, & label.Mui-focused, & input:not(.Mui-error)': {
      color: '#FFFFFF',
      textTransform: 'uppercase',
      fontSize: 13,
    },
    '& .MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before, & .MuiInput-underline:not(.Mui-error):after':
      {
        borderBottomColor: '#FFFFFF',
      },
  },
  lowercase: {
    '& label, & label.Mui-focused': {
      color: '#FFFFFF',
      textTransform: 'uppercase',
      fontSize: 13,
    },
    '& input:not(.Mui-error)': {
      color: '#FFFFFF',
      fontSize: 15,
    },
    '& .MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before, & .MuiInput-underline:not(.Mui-error):after':
      {
        borderBottomColor: '#FFFFFF',
      },
  },
  label: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    right: 0,
  },
};

const CustomTextField = ({
  fullWidth,
  multiline,
  initial = null,
  label,
  name,
  required,
  disabled,
  lowercase,
  type = 'text',
  ...props
}) => {
  const { classes } = props;
  const [value, setValue] = React.useState(initial);
  const hasError = props.isFormSubmitted && !props.isValid;
  const errorMessage = hasError ? props.errorMessage : null;

  useEffect(() => {
    props.setValue(initial);
  }, []);

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    props.setValue(value);
    setValue(value);
    if (props.onChange) props.onChange(value);
  };

  return (
    <div>
      <TextField
        disabled={disabled}
        fullWidth={fullWidth}
        multiline={multiline}
        name={name}
        label={required ? `${label} *` : label}
        type={type}
        onChange={handleChange}
        value={value}
        InputLabelProps={{
          shrink: true,
          className: classes.label,
        }}
        classes={{ root: lowercase ? classes.lowercase : classes.root }}
        helperText={errorMessage}
        error={hasError}
      />
    </div>
  );
};

export default withStyles(styles)(withFormsy(CustomTextField));
