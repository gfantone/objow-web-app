import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    colorPrimary: {
        backgroundColor: '#D8D8D8'
    },
    barColorPrimary: {
        backgroundColor: '#00E58D'
    }
}

const ProgressBar = ({ value, ...props }) => {
    const { classes } = props
    const displayValue = value <= 100 ? value : 100

    return <LinearProgress variant='determinate' value={displayValue} classes={{
        colorPrimary: classes.colorPrimary,
        barColorPrimary: classes.barColorPrimary
    }} />
}

export default withStyles(styles)(ProgressBar)