import React from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        fontSize: 13,
        textTransform: 'uppercase',
        color: '#555555',
    },
    lowercaseRoot: {
      textTransform: 'none',
      fontSize: 16,
      color: '#555555',
    }
}

const DefaultText = (props) => (
  <Typography {...props} classes={{ root: props.lowercase ? props.classes.lowercaseRoot : props.classes.root }} />
)

export default withStyles(styles)(DefaultText)
