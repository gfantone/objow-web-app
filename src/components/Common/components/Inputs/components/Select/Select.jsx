import React, { useEffect } from 'react'
import { withFormsy } from 'formsy-react'
import { FormControl, FormHelperText, InputLabel, Select } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    root: {
        textTransform: 'uppercase',
        fontSize: 13
    },
    label: {
        textTransform: 'uppercase',
        fontSize: 13
    }
};

const CustomSelect = ({ disabled, emptyDisabled = false, emptyText, error, fullWidth, initial = null, label, name, options, optionValueName, optionTextName, optionTextPrefix = null, required, ...props }) => {
    const { classes } = props;
    const [value, setValue] = React.useState(initial);
    const hasError = props.isFormSubmitted && !props.isValid;
    const errorMessage = hasError ? props.getErrorMessage : null;
    const finalLabel = label ? (required ? `${label} *` : label) : null;

    useEffect(() => {
        props.setValue(initial)
    }, [initial]);

    const handleChange = event => {
        const value = !emptyText || event.currentTarget.value != emptyText.toString().toUpperCase() ? event.currentTarget.value : null;
        setValue(value);
        props.setValue(value);
        if (props.onChange) props.onChange(value)
    };

    return (
        <div>
            <FormControl fullWidth={fullWidth}>
                <InputLabel shrink={true} error={hasError} className={classes.label}>{finalLabel}</InputLabel>
                <Select
                    native
                    disabled={disabled}
                    fullWidth={fullWidth}
                    name={name}
                    onChange={handleChange}
                    value={value}
                    error={hasError}
                    classes={{root: classes.root}}
                >
                    { !emptyDisabled && !emptyText && <option></option> }
                    { !emptyDisabled && emptyText && <option>{emptyText.toString().toUpperCase()}</option> }
                    { options != null && options.map((option, index) => {
                        return <option key={index} value={option[optionValueName]}>{optionTextPrefix}{option[optionTextName].toString().toUpperCase()}</option>
                    }) }
                </Select>
                <FormHelperText error={hasError}>{errorMessage}</FormHelperText>
            </FormControl>
        </div>
    )
};

export default withStyles(styles)(withFormsy(CustomSelect))
