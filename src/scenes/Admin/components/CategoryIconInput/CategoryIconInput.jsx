import React, { useEffect } from 'react'
import { withFormsy } from 'formsy-react'
import { CardMedia, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {ErrorText, LabelText, LabelErrorText} from '../../../../components'

const styles = {
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
}

const CategoryIconInput = ({ icons = [], initial, label, name, onChange, required, ...props }) => {
    const { classes } = props
    const [value, setValue] = React.useState(initial)
    const errorMessage = !(!props.isFormSubmitted && value == null) ? props.errorMessage : null
    const hasError = !(!props.isFormSubmitted && value == null || props.isValid)
    const finalLabel = required ? `${label} *` : label

    useEffect(() => {
        props.setValue(initial)
    }, [])

    const handleValue = value => () => {
        props.setValue(value)
        setValue(value)
        if (onChange) onChange(value)
    }

    return (
        <div>
            { !hasError && <LabelText>{finalLabel}</LabelText> }
            { hasError && <LabelErrorText>{finalLabel}</LabelErrorText> }
            <Grid container spacing={1}>
                { icons.map((icon) => {
                    const selected = icon.id == value
                    return (
                        <Grid key={icon.id} item onClick={handleValue(icon.id)}>
                            <CardMedia image={icon.path} className={selected ? classes.selectedIcon : classes.icon} />
                        </Grid>
                    )
                }) }
            </Grid>
            <input type='hidden' name={name} value={value} />
            { hasError && <ErrorText>{errorMessage}</ErrorText> }
        </div>
    )
}

export default withStyles(styles)(withFormsy(CategoryIconInput))
