import React from 'react'
import {TableCell} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: 13,
        color: '#555555',
        textTransform: 'uppercase',
        padding: 'initial',
        [theme.breakpoints.down('xs')]: {
            width: 1
        }
    }
}))

const CustomTableCell = (props) => {
    const classes = useStyles()

    return (
        <TableCell {...props} className={classes.root} />
    )
}

export default CustomTableCell