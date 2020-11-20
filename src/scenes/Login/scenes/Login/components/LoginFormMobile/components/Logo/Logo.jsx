import React from 'react'
import {CardMedia} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 100,
        backgroundSize: 'contain'
    }
})

const Logo = ({...props}) => {
    const classes = useStyles()
    const logoData = require('../../../../../../../../assets/logo_icon.png')

    return <CardMedia className={classes.root} image={logoData} />
}

export default Logo
