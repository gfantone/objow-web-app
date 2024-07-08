import React from 'react';
import { CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AccentText, DefaultText } from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';
import '../../../../../../helpers/StringHelper';
import _ from 'lodash';

const styles = {
  icon: {
    width: 60,
    height: 60,
    overflow: 'hidden',
    borderRadius: 30,
  },
};

const Badge = ({ badge, ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  let iconData = null;
  if (badge) {
    if (badge.code) {
      iconData = require(`../../../../../../assets/img/system/badge/icons/${badge.code}.svg`);
    } else if (badge.icon) {
      iconData = _.get(badge, 'icon.path');
    }
  }

  return (
    <div>
      <Grid container spacing={1} alignItems='center' direction='column'>
        <Grid item>
          <CardMedia image={iconData} className={classes.icon} />
        </Grid>
        <Grid item>
          <DefaultText
            lowercase
            style={{ fontSize: 16, fontWeight: 'bold' }}
            align='center'
          >
            {badge.publicTitle}
          </DefaultText>
        </Grid>
        {badge.rank && (
          <Grid item>
            <AccentText style={{ textTransform: 'none' }}>
              {intl
                .formatMessage({ id: 'collaborator.detail.badge_rank' })
                .format(badge.rank)}
            </AccentText>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Badge);
