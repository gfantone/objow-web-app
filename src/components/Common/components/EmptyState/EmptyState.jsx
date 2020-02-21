import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {EmptyStateAnimation} from './components'
import {DefaultText, DefaultTitle, InfoText} from '..'
import { Container } from '@material-ui/core';

const styles = {
    animation: {
        display: 'contents'
    },
    dividerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        width: 50,
        height: 1,
        marginTop: 16,
        backgroundColor: '#00E58D'
    },
    message: {
        marginTop: 16
    }
}

const EmptyState = ({ title, message, ...props }) => {
    const {classes} = props

    return (
        <div className={classes.root}>
            <Container maxWidth='xs'>
                <div className={classes.animation}>
                    <EmptyStateAnimation />
                </div>
                <DefaultTitle align='center'>{title}</DefaultTitle>
                <div className={classes.dividerContainer}>
                    <div className={classes.divider}></div>
                </div>
                <InfoText align='center' className={classes.message}>{message}</InfoText>
            </Container>
        </div>
    )
}

export default withStyles(styles)(EmptyState)