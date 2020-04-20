import React from 'react'
import {TableCell} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    rootDefault: {
        fontSize: 13,
        color: '#555555',
        textTransform: 'uppercase',
        padding: 'initial',
        [theme.breakpoints.down('xs')]: {
            width: 1
        }
    },
    rootPrimary: {
        fontSize: 13,
        color: '#00E58D',
        textTransform: 'uppercase',
        padding: 'initial',
        [theme.breakpoints.down('xs')]: {
            width: 1
        }
    }
}))

const CustomTableCell = ({color, ...props}) => {
    const classes = useStyles()
    const rootClass = color == 'primary' ? classes.rootPrimary : classes.rootDefault

    return (
        <TableCell {...props} className={rootClass} />
    )
}

export default CustomTableCell
