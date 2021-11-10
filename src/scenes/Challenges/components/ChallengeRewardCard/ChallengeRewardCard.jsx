import React from 'react'
import { Card } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  card: {
      borderRadius: 10,
      boxShadow: '0 2px 16px 0 rgba(16,61,92,0.25)'
  },
  content: {
      margin: 10
  }
};

const ChallengeCard = ({ marginDisabled = false, ...props }) => {
    const { classes } = props;
    const contentClass = !marginDisabled ? classes.content : null;

    return (
        <Card className={classes.card}>
            <div className={contentClass}>
                { props.children }
            </div>
        </Card>
    )
};

export default withStyles(styles)(ChallengeCard)
