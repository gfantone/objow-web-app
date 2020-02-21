import React from 'react'
import {Container} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        paddingLeft: 16,
        paddingRight: 16
    }
}

export default withStyles(styles)(Container)