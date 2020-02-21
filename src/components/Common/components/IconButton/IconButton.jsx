import React from 'react'
import { IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    root: {
        color: '#FFFFFF'
    },
    colorPrimary: {
        color: '#00E58D'
    },
    colorSecondary: {
        color: '#103D5C'
    }
}

export default withStyles(styles)(IconButton)