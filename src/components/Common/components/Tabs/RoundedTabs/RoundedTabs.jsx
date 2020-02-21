import React from 'react'
import {Tabs} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        height: 40,
        minHeight: 'initial',
        borderRadius: 20,
    },
    flexContainer: {
        height: 40,
        '& > button > span': {
            zIndex: '9999'
        }
    },
    indicator: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > div': {
            width: '100%',
            height: '40',
            borderRadius: 16,
            margin: 4,
            backgroundColor: '#00E58D',
        }
    }
}

export default withStyles(styles)((props) => <Tabs {...props} TabIndicatorProps={{children: <div/>}} />)