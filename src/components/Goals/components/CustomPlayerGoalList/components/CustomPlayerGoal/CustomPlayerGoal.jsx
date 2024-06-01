import React from 'react';
import { Avatar, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '../../../../..';

const styles = {
  avatar: {
    width: 48,
    height: 48,
  },
};

const CustomPlayerGoal = ({ classes, goal, onChange }) => {
  const photoSrc =
    goal.photo != null ? goal.photo : '/assets/img/user/avatar.svg';
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item>
          <Avatar src={photoSrc} className={classes.avatar} />
        </Grid>
        <Grid item xs>
          <TextField
            lowercase
            name={goal.id}
            label={`${goal.firstname} ${goal.lastname}`}
            value={goal.target}
            onChange={onChange}
            type="number"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(CustomPlayerGoal);
