import React from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        fontSize: 13,
        color: '#999999',
        textTransform: 'uppercase'
    },
    lowercaseRoot: {
        fontSize: 14,
        color: '#999999',
    }
}

const InfoText = (props) => (
  <Typography {...props} classes={{ root: props.lowercase ? props.classes.lowercaseRoot : props.classes.root }} />
)

export default withStyles(styles)(InfoText)
