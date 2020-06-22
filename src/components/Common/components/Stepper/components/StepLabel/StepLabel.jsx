import React from 'react'
import {StepLabel} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        alignItems: 'flex-start'
    },
    label: {
        textAlign: 'left !important'
    }
}

export default withStyles(styles)(StepLabel)
