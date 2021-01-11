import React from 'react'
import {Tab} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const style = {
    root: {
        height: 40,
        minHeight: 'initial',
        fontSize: 13,
        color: '#555555',
        minWidth: 'initial',
        textTransform: 'none'
    },
    selected: {
        color: '#FFFFFF'
    },
    wrapper: {
        marginTop: 2
    }
}

export default withStyles(style)(Tab)
