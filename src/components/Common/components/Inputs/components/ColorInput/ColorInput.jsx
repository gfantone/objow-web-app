import React, { useEffect } from 'react'
import { withFormsy } from 'formsy-react'
import { Grid} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { InfoText, ErrorText } from '../../../../..'

const styles = {
    color: {
        width: 50,
        height: 50,
        cursor: 'pointer',
        opacity: 0.25,
        '&:hover': {
            opacity: 1
        }
    },
    selectedColor: {
        width: 50,
        height: 50,
        cursor: 'pointer'
    }
};

const ColorInput = ({ colors = [], initial, label, name, onChange, required, ...props }) => {
    const { classes } = props;
    const [value, setValue] = React.useState(initial);
    const errorMessage = !(!props.isFormSubmitted && value == null) ? props.errorMessage : null;
    const hasError = !(!props.isFormSubmitted && value == null || props.isValid);
    const finalLabel = required ? `${label} *` : label;

    useEffect(() => {
        props.setValue(initial)
    }, []);

    const handleValue = value => () => {
        props.setValue(value);
        setValue(value);
        if (onChange) onChange(value)
    };

    return (
        <div>
            { !hasError && <InfoText>{finalLabel}</InfoText> }
            { hasError && <ErrorText>{finalLabel}</ErrorText> }
            <Grid container spacing={1}>
                { colors.map((color) => {
                    const selected = color.id == value;
                    return (
                        <Grid key={color.id} item onClick={handleValue(color.id)}>
                            <div className={selected ? classes.selectedColor : classes.color} style={{backgroundColor: color.hex}}></div>
                        </Grid>
                    )
                }) }
            </Grid>
            <input type='hidden' name={name} value={value} />
            { hasError && <ErrorText>{errorMessage}</ErrorText> }
        </div>
    )
};

export default withStyles(styles)(withFormsy(ColorInput))
