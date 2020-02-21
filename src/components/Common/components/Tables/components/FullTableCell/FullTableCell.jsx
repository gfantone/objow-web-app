import React from 'react'
import {TableCell} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        fontSize: 13,
        color: '#555555',
        textTransform: 'uppercase',
        padding: '0px !important',
        width: 1
    }
}

const FullTableCell = (props) => {
    const { className, classes, style } = props

    return (
        <TableCell {...props} className={className} classes={{ root:classes.root }} style={style} />
    )
}

export default withStyles(styles)(FullTableCell)