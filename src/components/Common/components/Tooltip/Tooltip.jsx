import React from 'react';
import { Hidden, Tooltip, Typography } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Dialog, DialogActions, DialogContent } from '..';
import { IconButton } from './components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
  },
  tooltip: {
    backgroundColor: '#717171',
  },
  typography: {
    fontSize: 15,
    textTransform: 'none',
  },
  dialogPaper: {
    overflow: 'visible',
  },
});

const CustomTooltip = ({
  title,
  className,
  rootClass,
  closeButtonStyle,
  ...props
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const defaultCloseButtonStyle = {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 100,
  };
  const closeButtonStyles = closeButtonStyle || defaultCloseButtonStyle;

  return (
    <div className={rootClass || classes.root}>
      <Hidden only='xs'>
        <Tooltip
          title={
            <React.Fragment>
              <Typography className={classes.typography}>{title}</Typography>
            </React.Fragment>
          }
          classes={{ tooltip: `${classes.tooltip} ${className}` }}
        >
          {props.children}
        </Tooltip>
      </Hidden>
      <Hidden smUp>
        <div onClick={onOpen}>{props.children}</div>
        <Dialog
          open={open}
          onClose={onClose}
          classes={{ paper: classes.dialogPaper }}
        >
          <DialogContent>{title}</DialogContent>
          <IconButton
            size='small'
            color='primary'
            onClick={onClose}
            style={closeButtonStyles}
          >
            <CloseIcon />
          </IconButton>
        </Dialog>
      </Hidden>
    </div>
  );
};

export default CustomTooltip;
