import React from 'react'
import { CardMedia } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    root: {
        height: 154,
        // marginLeft: -16,
        // marginRight: -16,
        // marginTop: -16,
        backgroundSize: 'cover',
        borderRadius: 15
    }
};

export default withStyles(styles)(CardMedia)
