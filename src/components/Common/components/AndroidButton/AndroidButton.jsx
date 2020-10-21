import React from 'react'
import {CardMedia} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        width: '100%',
        paddingTop: '31%',
        backgroundSize: 'contain',
        backgroundPosition: 'right',
        cursor: 'pointer'
    }
})

const AndroidButton = ({...props}) => {
    const classes = useStyles()
    const androidData = require('../../../../assets/img/mobile/android.png')

    return <CardMedia className={classes.root} image={androidData} onClick={() => window.open('https://play.google.com/store/apps/details?id=com.firetiger', '_blank')} />
}

export default AndroidButton
