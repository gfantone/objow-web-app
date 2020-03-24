import React, { useEffect } from 'react'
import { withFormsy } from 'formsy-react'
import { CardMedia, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { InfoText, ErrorText } from '../../../../components'

const styles = {
    label: {
        transform: 'scale(0.75)',
        transformOrigin: 'top left'
    },
    icon: {
        width: 50,
        height: 50,
        opacity: 0.25,
        '&:hover': {
            opacity: 1
        }
    },
    selectedIcon: {
        width: 50,
        height: 50
    }
};

const CategoryIconInput = ({ icons = [], initial, label, name, onChange, required, ...props }) => {
    const { classes } = props;
    const [value, setValue] = React.useState(initial);
    const errorMessage = !(!props.isFormSubmitted && value == null) ? props.getErrorMessage : null;
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
            { !hasError && <InfoText className={classes.label}>{finalLabel}</InfoText> }
            { hasError && <ErrorText className={classes.label}>{finalLabel}</ErrorText> }
            <Grid container spacing={1}>
                { icons.map((icon) => {
                    const iconData = require(`../../../../assets/img/system/category/icons/${icon.name}.svg`);
                    const selected = icon.id == value;
                    return (
                        <Grid key={icon.id} item onClick={handleValue(icon.id)}>
                            <CardMedia image={iconData} className={selected ? classes.selectedIcon : classes.icon} />
                        </Grid>
                    )
                }) }
            </Grid>
            <input type='hidden' name={name} value={value} />
            { hasError && <ErrorText>{errorMessage}</ErrorText> }
        </div>
    )
};

export default withStyles(styles)(withFormsy(CategoryIconInput))
