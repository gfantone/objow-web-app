import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import { Button } from '..'

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loader: {
        color: '#FFFFFF'
    }
};

const ProgressButton = ({disabled = false, type = '', text = '', fullWidth = false, color = 'default', loading = false, centered = false, onClick, ...props}) => {
    const { classes } = props;
    const rootClassName = centered ? classes.root : '';

    return (
        <div className={rootClassName}>
            <Button fullWidth={fullWidth} type={type} disabled={loading || disabled} color={color} onClick={onClick}>
                { !loading && text }
                { loading && <CircularProgress size={24} className={classes.loader} /> }
            </Button>
        </div>
    )
};

export default withStyles(styles)(ProgressButton)