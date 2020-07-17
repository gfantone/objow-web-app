import React from 'react'
import { CardMedia } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    root: {
        height: 200,
        marginLeft: -16,
        marginRight: -16,
        marginTop: -16,
        backgroundSize: 'cover'
    }
};

export default withStyles(styles)(CardMedia)
