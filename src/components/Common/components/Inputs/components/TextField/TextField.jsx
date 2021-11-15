import React, {useEffect} from 'react'
import {withFormsy} from 'formsy-react'
import {InputAdornment, TextField} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        '& label, & label.Mui-focused, & input:not(.Mui-error), & textarea:not(.Mui-error)': {
            textTransform: 'uppercase',
            fontSize: 13
        }
    },
    lowercase: {
        '& label, & label.Mui-focused': {
          textTransform: 'uppercase',
          fontSize: 13
        },
        '& input:not(.Mui-error), & textarea:not(.Mui-error)': {
            fontSize: 15
        }
    },
    bigLabel: {
      fontSize: '16px !important',
      textAlign: 'center',
      transform: 'none',
      top: "-5px"
    },
    mediumLabel: {
      transform: 'none',
      top: "-5px"
    },
    label: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        right: 0
    }
};

const CustomTextField = ({ endAdornment = null, fullWidth, multiline, initial = null, label, name, required, disabled, placeholder, lowercase, type = 'text', bigLabel, mediumLabel, ...props }) => {
    const { classes } = props;
    const [value, setValue] = React.useState(initial);
    const hasError = props.isFormSubmitted && !props.isValid;
    const errorMessage = hasError ? props.errorMessage : null;
    useEffect(() => {
        props.setValue(initial)
        setValue(initial)
    }, [initial]);

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        props.setValue(value);
        setValue(value);
        if (props.onChange) props.onChange(value)
    };

    return (
        <div>
            <TextField
                {...props}
                disabled={disabled}
                fullWidth={fullWidth}
                multiline={multiline}
                name={name}
                label={required ? `${label} *` : label}
                type={type}
                onChange={handleChange}
                value={value}
                InputProps={{
                    endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : null,
                }}
                InputLabelProps={{
                    shrink: !bigLabel && !mediumLabel,
                    className: `${classes.label} ${bigLabel ? classes.bigLabel : ''} ${mediumLabel ? classes.mediumLabel : ''}`
                }}
                classes={{ root: lowercase ? classes.lowercase : classes.root }}
                helperText={errorMessage}
                error={hasError}
                placeholder={placeholder}

            />
        </div>
    )
};

export default withStyles(styles)(withFormsy(CustomTextField))
