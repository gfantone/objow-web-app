import React from 'react'
import { Container } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    root: {
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#f7f8fc'
    }
};

export default withStyles(styles)(Container)