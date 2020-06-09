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
    label: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        right: 0
    }
};

const CustomTextField = ({ endAdornment = null, fullWidth, multiline, initial = null, label, name, required, disabled, type = 'text', ...props }) => {
    const { classes } = props;
    const [value, setValue] = React.useState(initial);
    const hasError = props.isFormSubmitted && !props.isValid;
    const errorMessage = hasError ? props.getErrorMessage : null;

    useEffect(() => {
        props.setValue(initial)
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
                    shrink: true,
                    className: classes.label
                }}
                classes={{ root: classes.root }}
                helperText={errorMessage}
                error={hasError}
            />
        </div>
    )
};

export default withStyles(styles)(withFormsy(CustomTextField))
