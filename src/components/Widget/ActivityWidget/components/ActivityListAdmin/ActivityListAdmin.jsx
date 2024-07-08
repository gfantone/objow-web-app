import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import * as userListActions from '../../../../../services/Users/UserList/actions';
import * as configListActions from '../../../../../services/Configs/ConfigList/actions';
import { bindActionCreators } from 'redux';
import { Card, DefaultText, Loader, DefaultTitle } from '../../../../Common';
import UserCard from '../UserCard/UserCard';
import { ChallengeSearchBar } from '../../../../../scenes/Challenges/components';
import { useIntl } from 'react-intl';
import { UserProfile } from '../../../../UserProfile';
import { NavLink } from 'react-router-dom';

const styles = {
  scrollWrapper: {
    overflowY: 'overlay',

    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(199, 199, 199, 0)',
      borderRadius: 5,
    },

    '&::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0)',
    },
    '&::-webkit-scrollbar': {
      '-webkit-appearance': 'none',
      '&:vertical': {
        width: 10,
      },
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(199, 199, 199, 1)',
        borderRadius: 5,
      },
    },
  },
};

const useStyles = makeStyles((theme) => {
  return {
    colorNumberUser: {
      fontWeight: 'bold',
      textTransform: 'none',
      color: theme.palette.primary.main,
      paddingLeft: 10,
    },
    badgeCard: {
      borderRadius: 20,
      border: '1px solid transparent',
      '&:hover': {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
  };
});

const ActivityListAdmin = ({
  userListActions,
  userList,
  width,
  classes,
  ...props
}) => {
  const { configs } = props.configList;
  const [search, setSearch] = useState('');
  const intl = useIntl();
  const [notDesktop, setNotDesktop] = useState(isWidthDown('xs', width));
  const [nextPage, setNextPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [displayUsersCount, setDisplayUsersCount] = useState();

  const themeClasses = useStyles();

  if (configs && configs.length > 0 && displayUsersCount === undefined) {
    const IUCD = configs.filter((c) => c.code === 'IUCD')[0];
    setDisplayUsersCount(IUCD.value.toBoolean());
  }
  const loadNextPage = () => {
    userListActions.getUserList({
      isActive: true,
      simple: false,
      page: nextPage + 1,
      search: search,
      orderBy: 'last_login',
      smallPages: true,
    });

    setNextPage(nextPage + 1);
  };

  useEffect(() => {
    if (userList.users) {
      const newUsers = [...users, ...userList.users];
      setUsers(newUsers);
      // userListActions.getUserListClear();
    }
  }, [userList.users]);

  useEffect(() => {
    setUsers([]);
    setNextPage(1);

    userListActions.getUserList({
      isActive: true,
      simple: false,
      page: 1,
      search: search,
      orderBy: 'last_login',
      smallPages: true,
    });
  }, [search]);

  const handleSearch = (newValue) => {
    setSearch(newValue);
  };

  const handleResize = () => {
    setNotDesktop(isWidthDown('lg', width));
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const numberUsers = `${userList.filteredTotal} / ${userList.total} ${intl
    .formatMessage({
      id: 'admin.import_log.users',
    })
    .toLowerCase()}`;

  return (
    <>
      <div style={{ paddingBottom: 5 }}>
        <ChallengeSearchBar
          search={search}
          onChange={handleSearch}
          placeholder={intl.formatMessage({
            id: 'admin.user.search_placeholder',
          })}
          fullSize
        />
      </div>

      <div
        className={notDesktop ? '' : classes.scrollWrapper}
        style={{
          height: 350,
          overflowX: 'hidden',
        }}
      >
        <>
          {users.length > 0 && displayUsersCount && (
            <DefaultText className={themeClasses.colorNumberUser}>
              {numberUsers}
            </DefaultText>
          )}
          {users.map((user) => (
            // <UserCard key={user.id} user={user} />
            <div style={{ margin: 10, cursor: 'pointer' }}>
              <NavLink
                style={{ textDecoration: 'none' }}
                to={`/collaborators/${user.id}/edit`}
              >
                <Card marginDisabled className={themeClasses.badgeCard}>
                  <UserProfile
                    key={user.id}
                    user={user}
                    hideAvatar
                    hideLastLogin
                  />
                </Card>
              </NavLink>
            </div>
          ))}
          {userList.loading && (
            <Grid
              container
              style={{
                width: '100%',
                height: users.length > 0 ? 50 : '100%',
              }}
              alignItems='center'
              justifyContent='center'
            >
              <Grid item>
                <Loader centered />
              </Grid>
            </Grid>
          )}
          {!userList.loading && users.length < userList.total && (
            <Grid container>
              <Grid item xs={12}>
                <DefaultTitle
                  lowercase
                  style={{ color: 'rgb(15,111,222)', cursor: 'pointer' }}
                  onClick={loadNextPage}
                >
                  <Grid container justifyContent='center'>
                    <Grid item style={{ fontSize: 18 }}>
                      {intl.formatMessage({ id: 'common.see_more' })}
                    </Grid>
                  </Grid>
                </DefaultTitle>
              </Grid>
            </Grid>
          )}
        </>
      </div>
    </>
  );
};

const mapStateToProps = ({ userList, configList }) => ({
  userList,
  configList,
});
const mapDispatchToProps = (dispatch) => ({
  userListActions: bindActionCreators(userListActions, dispatch),
  configListActions: bindActionCreators(configListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withWidth()(ActivityListAdmin)));
