import React from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        backgroundColor: '#BFC6E3',
        color: '#FFFFFF',
        fontSize: 11,
        paddingLeft: 8,
        paddingTop: 2,
        paddingRight: 8,
        textAlign: 'center',
        textTransform: 'uppercase'
    }
}

export default withStyles(styles)(Typography)