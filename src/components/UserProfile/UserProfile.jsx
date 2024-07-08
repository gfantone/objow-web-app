import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DarkTag, DefaultTitle, InfoText, Avatar } from '..';
import * as Resources from '../../Resources';
import { useIntl } from 'react-intl';

const styles = {
  root: {
    padding: 16,
  },
  avatar: {
    width: 41,
    height: 41,
  },
  citation: {
    marginTop: 16,
  },
};

const Collaborator = ({ user, hideLastLogin, hideAvatar, ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  const photoSrc = user.photo ? user.photo : '/assets/img/user/avatar.svg';

  const formatDate = (lastLogin) => {
    if (lastLogin) {
      const lastLoginDate = new Date(lastLogin * 1000);
      const day = lastLoginDate.getDate();
      const month = lastLoginDate.getMonth() + 1;
      const year = lastLoginDate.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return intl.formatMessage({
      id: 'admin.user.last_login_empty',
    });
  };
  let teamName = user.team
    ? user.team.name
    : intl.formatMessage({ id: 'admin.user.profile.no_team' });

  if (user.role.code === 'S') {
    teamName = user.team_group
      ? user.team_group.name
      : intl.formatMessage({ id: 'admin.user.profile.no_team' });
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems='center'>
        {!hideAvatar && (
          <Grid item>
            <Avatar
              src={photoSrc}
              className={classes.avatar}
              entityId={user.id}
              fallbackName={user.fullname}
            />
          </Grid>
        )}
        <Grid item xs>
          <Grid container xs={12}>
            <Grid item xs>
              <DefaultTitle
                style={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: 16,
                }}
              >
                {user.firstname} {user.lastname}
              </DefaultTitle>
            </Grid>
            <Grid
              item
              style={{ borderRadius: 5, overflow: 'hidden', height: 22 }}
            >
              <DarkTag lowercase>
                {intl.formatMessage({ id: `roles.${user.role.code}` })}
              </DarkTag>
            </Grid>
          </Grid>
          <Grid container xs={12}>
            <InfoText lowercase>{teamName}</InfoText>
          </Grid>
          {hideLastLogin && (
            <Grid item>
              <InfoText lowercase noWrap>
                {intl.formatMessage({ id: 'admin.user.last_login' }) + ' : '}
                <span style={{ color: '#555555' }}>
                  {formatDate(user.lastLogin)}
                </span>
              </InfoText>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Collaborator);
