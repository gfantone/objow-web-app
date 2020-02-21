import React from 'react'
import {TableCell} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: 13,
        color: '#555555',
        textTransform: 'uppercase',
        padding: 'initial',
        whiteSpace: 'nowrap', 
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        [theme.breakpoints.down('xs')]: {
            maxWidth: 0
        }
    }
}))

const FlexibleTableCell = (props) => {
    const classes = useStyles()

    return (
        <TableCell {...props} className={classes.root} />
    )
}

export default FlexibleTableCell