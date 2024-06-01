import React from 'react';
import { BoldTitle, DefaultTitle } from '../../..';
import { CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    width: 120,
    height: 120,
  },
  bigIcon: {
    width: 160,
    height: 160,
  },
};

const Category = ({ category, ...props }) => {
  const { classes, bigIcon } = props;
  return (
    <div>
      <Grid container spacing={1} alignItems='center' direction='column'>
        <Grid item>
          <CardMedia
            image={category.icon}
            className={bigIcon ? classes.bigIcon : classes.icon}
          />
        </Grid>
        <Grid item>
          <BoldTitle align='center' isContrast>
            {category.name}
          </BoldTitle>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Category);
