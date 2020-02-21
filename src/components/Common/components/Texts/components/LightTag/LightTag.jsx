import React from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        backgroundColor: '#EDF1FF',
        color: '#9EA6B7',
        border: '1px solid #BFC6E3',
        fontSize: 11,
        paddingLeft: 8,
        paddingTop: 2,
        paddingRight: 8,
        textAlign: 'center',
        textTransform: 'uppercase'
    }
}

export default withStyles(styles)(Typography)