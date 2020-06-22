import React from 'react'
import {StepConnector} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        top: 16,
        left: 'calc(-100% + 56px) !important',
        right: 'calc(100% + 8px) !important'
    }
}

export default withStyles(styles)(StepConnector)
