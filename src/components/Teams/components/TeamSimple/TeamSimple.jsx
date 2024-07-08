import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Tag } from './components';
import { DefaultTitle, ErrorText, InfoText, Avatar } from '../../..';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';
import '../../../../helpers/StringHelper';
import _ from 'lodash';

const styles = {
  root: {
    padding: 16,
  },
  tag: {
    borderRadius: 5,
  },
};

const TeamSimple = ({ team, classes, ...props }) => {
  const intl = useIntl();
  const players = team.collaborators.length;
  const managerPhoto =
    team.manager && team.manager.photo
      ? team.manager.photo
      : '/assets/img/user/avatar.svg';

  return (
    <div>
      <Grid container spacing={2} style={{ textAlign: 'left' }}>
        <Grid item>
          <Avatar
            src={managerPhoto}
            entityId={_.get(team, 'manager.id')}
            fallbackName={_.get(team, 'manager.fullname')}
          />
        </Grid>
        <Grid item xs zeroMinWidth>
          <div>
            <Grid container>
              <Grid item xs={12} zeroMinWidth>
                <DefaultTitle
                  noWrap
                  style={{
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: 16,
                  }}
                >
                  {team.name}
                </DefaultTitle>
              </Grid>
              <Grid item xs={12} zeroMinWidth>
                {team.manager && (
                  <InfoText
                    style={{ textTransform: 'none', fontSize: 14 }}
                    noWrap
                  >
                    {intl
                      .formatMessage({ id: 'team.detail.manager_text' })
                      .format(team.manager.firstname, team.manager.lastname)}
                  </InfoText>
                )}
                {!team.manager && (
                  <ErrorText
                    style={{ textTransform: 'none', fontSize: 14 }}
                    noWrap
                  >
                    {intl.formatMessage({ id: 'team.detail.no_manager_text' })}
                  </ErrorText>
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item>
          <Tag className={classes.tag} color={team.color.hex}>
            {intl
              .formatMessage({ id: 'team.detail.collaborators_text' })
              .format(players)}
          </Tag>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(TeamSimple);
