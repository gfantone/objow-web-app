import React from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        fontSize: 15,
        color: '#555555',
        textTransform: 'uppercase',
        fontWeight: '800'
    }
}

export default withStyles(styles)(Typography)
