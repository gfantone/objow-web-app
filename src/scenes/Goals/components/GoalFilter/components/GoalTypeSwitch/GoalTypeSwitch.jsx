import React, {useEffect} from 'react'
import {withFormsy} from 'formsy-react'
import {makeStyles, Typography} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const useStyles = makeStyles({
    active: {
        backgroundColor: '#BFC6E3',
        color: '#FFFFFF',
        cursor: 'pointer',
        fontSize: 11,
        paddingBottom: 3,
        paddingLeft: 9,
        paddingRight: 9,
        paddingTop: 3,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    inactive: {
        backgroundColor: '#F7F8FC',
        color: '#BFC6E3',
        cursor: 'pointer',
        border: '1px solid #D8DEF6',
        fontSize: 11,
        paddingBottom: 2,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        textAlign: 'center',
        textTransform: 'uppercase'
    }
})

const GoalTypeSwitch = ({icon, initial = true, label, name, onChange, ...props}) => {
    const classes = useStyles()
    const [value, setValue] = React.useState(initial)

    useEffect(() => {
        props.setValue(initial)
    }, [initial])

    const handleClick = () => {
        const newValue = !value
        props.setValue(newValue)
        setValue(newValue)
        if (onChange) onChange(newValue)
    }

    return (
        <React.Fragment>
            <Typography align='right' noWrap className={value ? classes.active : classes.inactive} onClick={handleClick}>
                <FontAwesomeIcon icon={icon} /> {label}
            </Typography>
            <input type='hidden' name={name} value={value} />
        </React.Fragment>
    )
}

export default withFormsy(GoalTypeSwitch)
