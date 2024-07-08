import React from 'react';
import { Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.default,
      position: 'relative',
      width: '100%',
    },
    container: {
      paddingLeft: 16,
      paddingRight: 16,
      zIndex: 1,
      position: 'relative',
    },
    childrenContainer: {
      backgroundColor: '#FFFFFF',

      borderRadius: 20,
      boxShadow: `0 2px 16px 0 rgba(16,61,92,0.38)`,
      overflow: 'hidden',
    },
    background: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: 20,
      backgroundColor: theme.palette.secondary.main,
      boxShadow: `0 2px 16px 0 ${theme.palette.secondary.main}`,
    },
  };
};

const SubHeaderContainer = ({
  children,
  hideHeader,
  childrenContainerClass,
  containerClass,
  rootClass,
  classes,
}) => {
  return (
    <div className={`${classes.root} ${rootClass}`}>
      <Container
        maxWidth='xs'
        className={`${classes.container} ${containerClass}`}
      >
        <div
          className={`${classes.childrenContainer} ${childrenContainerClass}`}
        >
          {children}
        </div>
      </Container>
      {!hideHeader && <div className={classes.background}></div>}
    </div>
  );
};

export default withStyles(styles)(SubHeaderContainer);
