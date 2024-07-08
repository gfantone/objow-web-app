import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Tag } from './components';
import { DefaultTitle, ErrorText, InfoText, Avatar, Card } from '../../..';
import * as Resources from '../../../../Resources';
import '../../../../helpers/StringHelper';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const styles = {
  thumbnail: {
    borderRadius: 15,
  },
  tag: {},
  teamWrapper: {
    // width: '100%',
    flexWrap: 'nowrap',
    minWidth: '100%',
    // overflow: 'hidden',
  },
};

const Team = ({ team, classes, ...props }) => {
  const intl = useIntl();
  const players = team.collaborators.length;
  const managerPhoto =
    team.manager && team.manager.photo
      ? team.manager.photo
      : '/assets/img/user/avatar.svg';

  return (
    <Card className={classes.thumbnail}>
      <Grid container spacing={2} className={classes.teamWrapper}>
        <Grid item>
          <Avatar
            src={managerPhoto}
            entityId={_.get(team, 'manager.id')}
            fallbackName={_.get(team, 'manager.fullname')}
            tooltip={_.get(team, 'manager.fullname')}
          />
        </Grid>
        <Grid item xs={9} container alignItems='flex-start' justify='left'>
          <Grid item xs={12} zeroMinWidth>
            <DefaultTitle
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: 16,
              }}
            >
              {team.name}
            </DefaultTitle>
          </Grid>
          <Grid
            item
            style={{ borderRadius: 5, overflow: 'hidden', height: 18 }}
          >
            <Tag className={classes.tag} color={team.color.hex}>
              {intl
                .formatMessage({ id: 'team.collaborators_text' })
                .format(players)}
            </Tag>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default withStyles(styles)(Team);
