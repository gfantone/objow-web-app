import React from 'react'
import {Stepper} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        marginLeft: -8,
        marginRight: -8,
        padding: 0
    }
}

export default withStyles(styles)(Stepper)
