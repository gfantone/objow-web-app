import React from 'react'
import {TableCell} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        fontSize: 13,
        color: '#555555',
        textTransform: 'uppercase',
        padding: 'initial',
        width: 1,
        verticalAlign: 'top'
    }
};

const FixedTableCell = (props) => {
    const {classes} = props;

    return (
        <TableCell {...props} className={classes.root} />
    )
};

export default withStyles(styles)(FixedTableCell)