import React from 'react';
import { Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    borderRadius: 10,
    boxShadow: '0 2px 16px 0 rgba(16,61,92,0.25)',
    transition: 'transform 200ms',
    // border: '1px solid transparent',
    '&:hover': {
      transform: 'scale(1.02)',
      // border: '1px solid #00E58D',
    },
  },
  content: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
};

const ChallengeCard = ({ marginDisabled = false, ...props }) => {
  const { classes } = props;
  const contentClass = !marginDisabled ? classes.content : null;

  return (
    <div>
      <Card className={classes.card}>
        <div className={contentClass}>{props.children}</div>
      </Card>
    </div>
  );
};

export default withStyles(styles)(ChallengeCard);
