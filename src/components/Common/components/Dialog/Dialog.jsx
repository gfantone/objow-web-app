import React, { useState, useEffect } from 'react';
import { Dialog, Slide } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const styles = {
  paper: {
    padding: 16,
    '& > div:first-child, & > form > div:first-child': {
      marginTop: 0,
      paddingTop: 0,
    },
    '& > div:nth-child(2), & > div:nth-child(3), & > form > div:nth-child(2), & > form > div:nth-child(3)':
      {
        marginTop: 16,
      },
  },
};
const DialogComponent = withStyles(styles)(Dialog);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const CustomDialog = ({ width, ...props }) => {
  const mobileScreen = isWidthDown('xs', width);

  return (
    <React.Fragment>
      {mobileScreen && (
        <DialogComponent
          {...props}
          fullScreen
          style={{ marginTop: 50 }}
          TransitionComponent={Transition}
        />
      )}
      {!mobileScreen && <DialogComponent {...props} />}
    </React.Fragment>
  );
};

export default withWidth()(CustomDialog);
