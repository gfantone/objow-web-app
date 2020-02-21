import React from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        fontSize: 13,
        color: '#FFFFFF',
        textTransform: 'uppercase'
    }
}

export default withStyles(styles)(Typography)
