import React from 'react'
import {withStyles} from '@material-ui/core/styles'

const styles = {
    root: {
        display: 'flex',
        alignItems: 'flex-end',
        height: '100%',
    },
    container: {
        width: 150,
        height: 100,
        position: 'relative'
    },
    animation: {
        height: 150,
        width: 150,
        position: 'absolute',
        bottom: 0
    }
}

const RocketAnimationContainer = (props) => {
    const {classes} = props
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.animation}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(RocketAnimationContainer)