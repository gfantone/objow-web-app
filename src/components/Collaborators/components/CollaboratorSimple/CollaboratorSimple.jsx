import React from 'react';
import { Grid, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DefaultText, Avatar, DefaultTitle, InfoText } from '../../..';
import { injectIntl } from 'react-intl';
import _ from 'lodash';

const styles = {
  root: {},
  avatar: {
    height: 40,
    width: 40,
    marginTop: 3,
  },
  borderRadius: {
    borderRadius: 20,
    padding: 15,
  },
  thumbnail: {
    cursor: 'pointer',
    transition: 'transform 200ms ease-in',
    '&:hover': {
      transform: 'scale(1.02)',
      border: '1px solid #00E58D',
    },
  },
  cardContent: {
    margin: 16,
  },
};

const CollaboratorSimple = ({ collaborator, displayTeam, ...props }) => {
  const { classes, intl } = props;
  const photo = collaborator.photo
    ? collaborator.photo
    : '/assets/img/user/avatar.svg';

  return (
    <div>
      <Grid container spacing={2} style={{ textAlign: 'left' }}>
        <Grid item>
          <Avatar
            src={photo}
            className={classes.avatar}
            entityId={collaborator.id}
            fallbackName={collaborator.fullname}
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
                  {collaborator.firstname} {collaborator.lastname}
                </DefaultTitle>
              </Grid>
              {_.get(collaborator, 'level') && (
                <Grid item xs={12} zeroMinWidth>
                  <InfoText
                    style={{ textTransform: 'none', fontSize: 14 }}
                    noWrap
                  >
                    {intl.formatMessage({ id: 'common.level' })}{' '}
                    {_.get(collaborator, 'level.number')}
                  </InfoText>
                </Grid>
              )}
              {displayTeam && (
                <Grid item xs={12} zeroMinWidth>
                  <InfoText
                    style={{ textTransform: 'none', fontSize: 14 }}
                    noWrap
                  >
                    {_.get(collaborator, 'team.name')}
                  </InfoText>
                </Grid>
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(injectIntl(CollaboratorSimple));
