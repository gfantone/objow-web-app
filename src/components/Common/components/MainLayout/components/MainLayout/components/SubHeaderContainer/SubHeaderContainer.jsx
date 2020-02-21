import React from 'react'
import { Container } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    root: {
        backgroundColor: '#f7f8fc',
        position: 'relative',
        width: '100%'
    },
    container: {
        paddingLeft: 16,
        paddingRight: 16,
        zIndex: 1,
        position: 'relative'
    },
    childrenContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        boxShadow: '0 2px 16px 0 rgba(16,61,92,0.38)',
        overflow: 'hidden'
    },
    background: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 20,
        backgroundColor: '#103D5C',
        boxShadow: '0 2px 16px 0 rgba(16,61,92,0.38)'
    }
};

const SubHeaderContainer = ({children, classes}) => {
    return (
        <div className={classes.root}>
            <Container maxWidth='xs' className={classes.container}>
                <div className={classes.childrenContainer}>
                    {children}
                </div>
            </Container>
            <div className={classes.background}>

            </div>
        </div>
    )
};

export default withStyles(styles)(SubHeaderContainer)