import React from 'react';
import { Grid } from '@material-ui/core';
import { Tag } from './components';
import { DefaultTitle, ErrorText, InfoText, Avatar } from '../../..';
import * as Resources from '../../../../Resources';
import '../../../../helpers/StringHelper';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const Team = ({ team, ...props }) => {
  const intl = useIntl();
  const players = team.collaborators.length;
  const managerPhoto =
    team.manager && team.manager.photo
      ? team.manager.photo
      : '/assets/img/user/avatar.svg';

  return (
    <div>
      <Grid container spacing={2} style={{ textAlign: 'left' }}>
        <Grid item xs={2}>
          <Avatar
            src={managerPhoto}
            entityId={_.get(team, 'manager.id')}
            fallbackName={_.get(team, 'manager.fullname')}
          />
        </Grid>
        <Grid item xs={10} container>
          <Grid item xs zeroMinWidth>
            <DefaultTitle noWrap>{team.name}</DefaultTitle>
          </Grid>
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
                .format(players)}
            </Tag>
          </Grid>
          <Grid item xs={12} zeroMinWidth>
            {team.manager && (
              <InfoText noWrap>
                {intl
                  .formatMessage({ id: 'team.manager_text' })
                  .format(team.manager.firstname, team.manager.lastname)}
              </InfoText>
            )}
            {!team.manager && (
              <ErrorText noWrap>
                {intl.formatMessage({ id: 'team.no_manager_text' })}
              </ErrorText>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Team;
