import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { EmptyStateAnimation } from './components';
import { DefaultText, DefaultTitle, InfoText } from '..';
import { Container } from '@material-ui/core';

const styles = (theme) => {
  return {
    animation: {
      display: 'contents',
    },
    dividerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    divider: {
      width: 50,
      height: 1,
      marginTop: 16,
      backgroundColor: theme.palette.secondary.main,
    },
    message: {
      marginTop: 16,
    },
  };
};

const EmptyState = ({ title, message, rootClass, ...props }) => {
  const { classes } = props;

  return (
    <div className={`${classes.root} ${rootClass ? rootClass : ''}`}>
      <Container maxWidth='xs'>
        <div className={classes.animation}>
          <EmptyStateAnimation />
        </div>
        {title && (
          <DefaultTitle isContrast align='center'>
            {title}
          </DefaultTitle>
        )}
        {title && message && (
          <div className={classes.dividerContainer}>
            <div className={classes.divider}></div>
          </div>
        )}
        {message && (
          <InfoText isContrast align='center' className={classes.message}>
            {message}
          </InfoText>
        )}
      </Container>
    </div>
  );
};

export default withStyles(styles)(EmptyState);
