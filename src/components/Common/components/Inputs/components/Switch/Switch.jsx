import React, {useEffect} from 'react'
import {withFormsy} from 'formsy-react'
import {FormControlLabel, Switch} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        color: 'red',
        margin: theme.spacing(1),
    },
    label: {
        textTransform: 'uppercase',
        fontSize: 13
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#00E58D',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#00E58D',
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
    focusVisible: {}
}));

const CustomSwitch = ({disabled, initial = false, label, name, onChange, ...props}) => {
    const classes = useStyles()
    const [value, setValue] = React.useState(initial)

    useEffect(() => {
        props.setValue(initial)
    }, [])

    const handleChange = (event) => {
        const value = event.currentTarget.checked
        props.setValue(value)
        setValue(value)
        if (onChange) onChange(value)
    }

    return (
        <div>
            <FormControlLabel label={label} classes={{label: classes.label}} control={<Switch
                name={name}
                checked={value}
                disabled={disabled}
                onChange={handleChange}
                classes={{
                    root: classes.root,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                    focusVisible: classes.focusVisible
                }}
            />} />
        </div>
    )
}

export default withFormsy(CustomSwitch)
