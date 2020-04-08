import React from 'react'
import {Container} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        maxWidth: 'none',
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#103D5C',
        display: 'flex',
        position: 'relative'
    }
};

export default withStyles(styles)(Container)
