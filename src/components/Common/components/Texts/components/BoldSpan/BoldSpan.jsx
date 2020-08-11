import React from 'react'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        fontWeight: 800
    }
}

const BoldSpan = ({...props}) => {
    const {classes} = props

    return (
        <span className={classes.root}>{props.children}</span>
    )
}

export default withStyles(styles)(BoldSpan)
