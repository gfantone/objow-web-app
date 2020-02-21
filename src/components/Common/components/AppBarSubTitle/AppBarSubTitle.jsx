import React from 'react'
import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {DefaultText} from '..'

const styles ={
    root: {
        height: 40
    }
}

const AppBarSubTitle = ({ title, ...props }) => {
    const { classes } = props

    return (
        <Grid container className={classes.root} alignItems='center' justify='center'>
            <Grid item>
                <DefaultText>{title}</DefaultText>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(AppBarSubTitle)