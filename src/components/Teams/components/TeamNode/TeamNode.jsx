import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AvatarGroup } from '@material-ui/lab';
import { Tag } from '../../../Teams/components/Team/components';
import { DefaultTitle, ErrorText, InfoText, Avatar } from '../../..';
import * as Resources from '../../../../Resources';
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
  avatarFirst: {
    width: 40,
    height: 40,
    marginTop: '-5px',
  },
};

const TeamNode = ({ team, classes, hideAvatars, ...props }) => {
  const intl = useIntl();
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
  const avatarLimit = 4;
  const totalCollaboratorCount = team.collaborators_count
    ? team.collaborators_count
    : _.get(team, 'collaborators.length', 0);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} container justify="left">
          <Grid item xs zeroMinWidth>
            <DefaultTitle
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: 16,
              }}
              noWrap
            >
              {team.name}
            </DefaultTitle>
          </Grid>
          {team.color && (
            <Grid
              item
              style={{
                marginLeft: 5,
                borderRadius: 5,
                overflow: 'hidden',
                height: 18,
              }}
            >
              <Tag color={team.color.hex}>
                {intl
                  .formatMessage({ id: 'team.collaborators_text' })
                  .format(totalCollaboratorCount)}
              </Tag>
            </Grid>
          )}
          <Grid item xs={12} zeroMinWidth style={{ textAlign: 'left' }}>
            {team.manager && (
              <InfoText style={{ textTransform: 'none', fontSize: 14 }} noWrap>
                {intl
                  .formatMessage({ id: 'team.manager_text' })
                  .format(team.manager.firstname, team.manager.lastname)}
              </InfoText>
            )}
            {!team.manager && (
              <ErrorText style={{ textTransform: 'none', fontSize: 14 }} noWrap>
                {intl.formatMessage({ id: 'team.no_manager_text' })}
              </ErrorText>
            )}
          </Grid>
        </Grid>
        {!hideAvatars && (
          <Grid item style={{ width: '100%' }}>
            <AvatarGroup className={classes.avatarGroup} max={15}>
              {_.take(collaboratorList, avatarLimit).map(
                (collaborator, index) => (
                  <Avatar
                    src={_.get(collaborator, 'photo')}
                    entityId={_.get(collaborator, 'id')}
                    className={
                      index === 0 && team.manager
                        ? classes.avatarFirst
                        : classes.avatar
                    }
                    fallbackName={
                      _.get(collaborator, 'photo')
                        ? ''
                        : _.get(collaborator, 'fullname') ||
                          _.get(collaborator, 'rank') ||
                          index + 1
                    }
                    fontSize={12}
                    color={'#555'}
                    borderColor={
                      index === 0 && team.manager
                        ? _.get(team, 'color.hex')
                        : ''
                    }
                    tooltip={_.get(collaborator, 'fullname')}
                  />
                ),
              )}

              {((team.collaborators_count &&
                team.collaborators_count > avatarLimit) ||
                collaboratorList.length > avatarLimit) && (
                <Avatar
                  rawFallbackName={`+ ${
                    team.collaborators_count
                      ? team.collaborators_count + 1 - avatarLimit
                      : collaboratorList.length - avatarLimit
                  }`}
                  className={classes.avatar}
                  backgroundColor={'white'}
                  fontSize={12}
                  color={'#555'}
                />
              )}
            </AvatarGroup>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(TeamNode);
