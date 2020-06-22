import React from 'react'
import {Chip} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        fontSize: 13,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        backgroundColor: '#103D5C'
    },
    colorPrimary: {
        backgroundColor: '#00E58D'
    }

}

export default withStyles(styles)(Chip)
