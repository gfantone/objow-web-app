import React from 'react';
import { CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DefaultText } from '../../../../components';

const styles = {
  icon: {
    height: 34,
    width: 34,
  },
};

const Category = ({ category, title, ...props }) => {
  const { classes } = props;

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <CardMedia image={category.icon.path} className={classes.icon} />
        </Grid>
        <Grid item xs>
          <DefaultText>
            {title} « {category.name} »
          </DefaultText>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Category);
