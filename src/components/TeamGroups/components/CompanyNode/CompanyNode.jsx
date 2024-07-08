import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AvatarGroup } from '@material-ui/lab';
import { Tag } from '../../../Teams/components/Team/components';
import { DefaultTitle, ErrorText, InfoText, Avatar } from '../../..';
import * as Resources from '../../../../Resources';
import '../../../../helpers/StringHelper';
import _ from 'lodash';

const styles = {
  managerAvatar: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  avatarGroup: {},
  avatar: {
    width: 50,
    height: 50,
  },
};

const CompanyNode = ({ team, classes, companyLogo, ...props }) => {
  const players = _.get(team, 'collaborators.length');
  const managerPhoto = _.get(
    team,
    'manager.photo',
    '/assets/img/user/avatar.svg',
  );
  const collaboratorList = _.compact([
    _.get(team, 'manager', null),
    ..._.get(team, 'collaborators', []),
  ]);
  const avatarLimit = 6;
  return (
    <div>
      <Grid container justify="center" spacing={1}>
        <Grid item align="center" xs={12}>
          <Avatar src={companyLogo} className={classes.avatar} />
        </Grid>

        <Grid align="center" item xs={12}>
          <DefaultTitle
            style={{ fontWeight: 'bold', textTransform: 'none', fontSize: 18 }}
            noWrap
          >
            {team.name}
          </DefaultTitle>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(CompanyNode);
