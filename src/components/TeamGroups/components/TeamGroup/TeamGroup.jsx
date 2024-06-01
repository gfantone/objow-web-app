import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Tag } from '../../../Teams/components/Team/components';
import { DefaultTitle, ErrorText, InfoText, Avatar } from '../../..';
import { useIntl } from 'react-intl';
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
    width: 30,
    height: 30,
  },
  tag: {
    backgroundColor: '#F2F5FC',
    color: '#43586C',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
};

const TeamGroup = ({
  team,
  classes,
  hideTeamGroupUsers,
  teamNumber,
  teamNumberWording,
  hideManager,
  image,
  ...props
}) => {
  const intl = useIntl();
  const players = _.get(team, 'collaborators.length');
  const managerPhoto = _.get(
    team,
    'manager.photo',
    '/assets/img/user/avatar.svg'
  );
  const collaboratorList = _.compact([
    _.get(team, 'manager', null),
    ..._.get(team, 'collaborators', []),
  ]);
  const avatarLimit = 6;

  const teamNumberWordingId =
    teamNumberWording && teamNumberWording === 'team_groups'
      ? 'team.group_team_groups_text'
      : 'team.group_teams_text';
  return (
    <div>
      <Grid container style={{}}>
        <Grid item xs={2} style={{ minWidth: 40, marginRight: 8 }}>
          <Avatar
            src={image || managerPhoto}
            entityId={_.get(team, 'manager.id')}
            fallbackName={_.get(team, 'manager.fullname')}
          />
        </Grid>
        <Grid item xs={9} container alignItems='center'>
          <Grid item xs={12}>
            <DefaultTitle
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: hideManager ? 18 : 16,
                maxWidth: 320,
              }}
              noWrap
            >
              {team.name}
            </DefaultTitle>
          </Grid>

          {teamNumber !== undefined ? (
            <Grid
              item
              zeroMinWidth
              style={{ borderRadius: 5, overflow: 'hidden', height: 18 }}
            >
              <Tag className={classes.tag}>
                {intl
                  .formatMessage({ id: teamNumberWordingId })
                  .format(_.get(team, 'teams.length', teamNumber))}
              </Tag>
            </Grid>
          ) : (
            <React.Fragment>
              {!hideManager && (
                <Grid item xs={12} zeroMinWidth style={{ textAlign: 'left' }}>
                  {team.manager && (
                    <InfoText
                      style={{ textTransform: 'none', fontSize: 14 }}
                      noWrap
                    >
                      {intl
                        .formatMessage({ id: 'team.manager_text' })
                        .format(team.manager.firstname, team.manager.lastname)}
                    </InfoText>
                  )}
                  {!team.manager && (
                    <ErrorText
                      style={{ textTransform: 'none', fontSize: 14 }}
                      noWrap
                    >
                      {intl.formatMessage({ id: 'team.no_manager_text' })}
                    </ErrorText>
                  )}
                </Grid>
              )}
            </React.Fragment>
          )}
          {!hideTeamGroupUsers && (
            <Grid item xs={12} zeroMinWidth style={{ textAlign: 'left' }}>
              <InfoText
                style={{ textTransform: 'none', color: 'rgb(15,111,222)' }}
              >
                {intl
                  .formatMessage({ id: 'team.group_collaborators_text' })
                  .format(_.get(collaboratorList, 'length', 0))}
              </InfoText>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(TeamGroup);
