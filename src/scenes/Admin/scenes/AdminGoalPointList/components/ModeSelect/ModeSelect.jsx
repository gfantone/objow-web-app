import React from 'react';
import { Grid, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DefaultText } from '../../../../../../components';

const styles = {
  icon: {
    width: 150,
    height: 150,
  },
  link: {
    cursor: 'pointer',
  },
};

const ModeSelect = ({ onChange, classes }) => {
  const global_icon = require(`../../../../../../assets/img/system/badge/icons/REM.svg`);
  const team_icon = require(`../../../../../../assets/img/system/badge/icons/TCO.svg`);
  return (
    <Grid container direction="row" justify="center" spacing={8}>
      <Grid item onClick={() => onChange('global')} className={classes.link}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <CardMedia image={global_icon} className={classes.icon} />
          </Grid>
          <Grid item xs>
            <DefaultText>Global</DefaultText>
          </Grid>
        </Grid>
      </Grid>
      <Grid item onClick={() => onChange('team')} className={classes.link}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <CardMedia image={team_icon} className={classes.icon} />
          </Grid>
          <Grid item xs>
            <DefaultText>Equipe</DefaultText>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ModeSelect);
