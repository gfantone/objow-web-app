import React from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        fontSize: 13,
        color: '#555555',
        textTransform: 'uppercase'
    },
    colorPrimary: {
        color: '#00E58D'
    },
    colorSecondary: {
        color: '#999999'
    },
    h1: {
        color: '#FFFFFF',
        flexGrow: 1,
        textAlign: 'center'
    },
    h2: {
        fontSize: 15
    }
}

export default withStyles(styles)(Typography)