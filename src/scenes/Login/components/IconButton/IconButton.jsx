import React from 'react'
import {IconButton} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        backgroundColor: '#0073b1',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#0073b1'
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    }
};

export default withStyles(styles)(IconButton)
