import React from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    rootUppercase: {
        fontSize: 13,
        textTransform: 'uppercase',
        color: '#555555',
    },
    rootLowercase: {
      textTransform: 'none',
      fontSize: 16,
      color: '#555555',
    }
}

const DefaultText = (props) => {
  return <Typography className={props.lowercase ? props.classes.rootLowercase : props.classes.rootUppercase} {...props} />
}

export default withStyles(styles)(DefaultText)
