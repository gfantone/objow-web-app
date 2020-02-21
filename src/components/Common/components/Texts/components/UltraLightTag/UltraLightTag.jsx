import React from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        backgroundColor: '#F7F8FC',
        color: '#BFC6E3',
        border: '1px solid #D8DEF6',
        fontSize: 11,
        paddingLeft: 8,
        paddingTop: 2,
        paddingRight: 8,
        textAlign: 'center',
        textTransform: 'uppercase'
    }
}

export default withStyles(styles)(Typography)