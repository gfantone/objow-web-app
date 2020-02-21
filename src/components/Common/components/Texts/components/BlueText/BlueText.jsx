import React from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        fontSize: 13,
        color: '#103D5C',
        textTransform: 'uppercase'
    }
}

export default withStyles(styles)(Typography)