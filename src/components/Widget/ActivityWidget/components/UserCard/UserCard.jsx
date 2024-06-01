import React from 'react';
import { Card, Grid } from '@material-ui/core';
import { Chip, DefaultTitle, InfoText } from '../../../../Common';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

const UserCard = ({ user }) => {
  const intl = useIntl();

  const isCollaborator = user.role.code === 'C';
  const isAdministrator = user.role.code === 'A';
  const isSuperManager = user.role.code === 'S';
  const isManager = user.role.code === 'M';

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

  return (
    <Card style={{ margin: 10, padding: 5 }}>
      <NavLink
        style={{ textDecoration: 'none' }}
        to={`/admin/users/modification/${user.id}`}
      >
        <Grid container spacing={2} justifyContent='space-between'>
          <Grid item xs={12}>
            <Grid container direction='column'>
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <DefaultTitle
                      noWrap
                      lowercase
                      style={{
                        fontWeight: 'bold',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        maxWidth: 200,
                      }}
                    >
                      {user.fullname}
                    </DefaultTitle>
                  </Grid>

                  <Grid item xs={4}>
                    <Grid container justifyContent='flex-end'>
                      <Grid item>
                        {user.team === null ? (
                          ''
                        ) : (
                          <Chip
                            size='small'
                            style={{
                              borderColor: '#00E58D',
                              textTransform: 'none',
                              fontSize: 10,
                              background: 'transparent',
                              color: '#333',
                            }}
                            variant='outlined'
                            label={user.team.name}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <InfoText lowercase noWrap>
                  {isCollaborator && intl.formatMessage({ id: 'roles.C' })}
                  {isAdministrator && intl.formatMessage({ id: 'roles.A' })}
                  {isManager && intl.formatMessage({ id: 'roles.M' })}
                  {isSuperManager && intl.formatMessage({ id: 'roles.S' })}
                </InfoText>
              </Grid>
              <Grid item>
                <InfoText lowercase noWrap>
                  {intl.formatMessage({ id: 'admin.user.last_login' }) + ' : '}
                  <span style={{ color: '#555555' }}>
                    {formatDate(user.lastLogin)}
                  </span>
                </InfoText>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </NavLink>
    </Card>
  );
};

export default UserCard;
