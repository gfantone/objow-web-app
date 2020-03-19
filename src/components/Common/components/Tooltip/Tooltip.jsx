import React from 'react'
import {Hidden, Tooltip, Typography} from '@material-ui/core'
import {Close as CloseIcon} from '@material-ui/icons';
import {Dialog, DialogActions, DialogContent} from '..'
import {IconButton} from './components'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        display: 'inline-block'
    },
    tooltip: {
        backgroundColor: '#717171'
    },
    typography: {
        fontSize: 13,
        textTransform: 'uppercase'
    }
});

const CustomTooltip = ({title, ...props}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const onOpen = () => {
        setOpen(true)
    };

    const onClose = () => {
        setOpen(false)
    };

    return (
        <div className={classes.root}>
            <Hidden only='xs'>
                <Tooltip title={<React.Fragment>
                    <Typography className={classes.typography}>{title}</Typography>
                </React.Fragment>} classes={{tooltip: classes.tooltip}}>
                    {props.children}
                </Tooltip>
            </Hidden>
            <Hidden smUp>
                <div onClick={onOpen}>
                    {props.children}
                </div>
                <Dialog open={open} onClose={onClose}>
                    <DialogContent>{title}</DialogContent>
                    <DialogActions>
                        <IconButton size='small' color='primary' onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </Hidden>
        </div>
    )
};

export default CustomTooltip
