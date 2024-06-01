import React, { useState, useEffect, useRef } from 'react';
import * as challengeParticipantListActions from '../../../../services/ChallengeParticipants/ChallengeParticipantList/actions';
import * as userListAction from '../../../../services/Users/UserList/actions';
import {
  Avatar,
  Collaborator,
  DefaultText,
  DefaultTitle,
  Loader,
} from '../../../../components';
import { useIntl } from 'react-intl';
import {
  Grid,
  withStyles,
  Chip,
  withWidth,
  isWidthDown,
} from '@material-ui/core';
import ChallengeSearchBar from '../ChallengeSearchBar/ChallengeSearchBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

const styles = {
  item: {
    marginBottom: 10,
    position: 'relative',
    zIndex: 10,
  },
  dropdown: {
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'absolute',
    top: 30,
    padding: 20,
    background: 'white',
    zIndex: 10,
    boxShadow: '0 2px 16px 0 rgba(16,61,92,0.25)',
    borderRadius: 10,
  },
  filterChip: {
    marginRight: 5,
    marginBottom: 5,
  },
};

const ChallengeSearchBarCollaborators = ({
  classes,
  onSelectCollaborator,
  fetchUsers,
  usersState,
  ...props
}) => {
  const intl = useIntl();
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { width } = props;

  const dropdownRef = useRef();
  const overlayRef = useRef();

  const isMobile = isWidthDown('xs', width);

  const {
    users: fetchedCollaborators,
    hasError,
    loading,
  } = usersState ? usersState : props.userList;

  const [nextPage, setNextPage] = useState(1);

  const fetchNextPage = () => {
    const fetchUsersSource = fetchUsers
      ? fetchUsers
      : props.userListAction.getUserList;
    fetchUsersSource({
      page: nextPage + 1,
      search: search,
      roleCode: 'C',
      smallPages: true,
    });

    setNextPage(nextPage + 1);
  };

  useEffect(() => {
    const { account } = props.accountDetail;

    if (fetchedCollaborators) {
      const filteredFetchedCollaborators = fetchedCollaborators.filter(
        (fetchedCollaborator) =>
          account.role.code === 'A' ||
          fetchedCollaborator.team.id === _.get(account, 'team.id') ||
          _.get(account, 'team_group.allTeamIds', []).indexOf(
            fetchedCollaborator.team.id
          ) >= 0
      );

      setCollaborators([...collaborators, ...filteredFetchedCollaborators]);
    }
  }, [fetchedCollaborators]);

  useEffect(() => {
    if (search) {
      setCollaborators([]);

      const fetchUsersSource = fetchUsers
        ? fetchUsers
        : props.userListAction.getUserList;
      fetchUsersSource({
        page: nextPage,
        search: search,
        roleCode: 'C',
        smallPages: true,
      });
      setNextPage(nextPage);
    }
  }, [search]);

  const handleSearch = (newValue) => {
    setSearchText(newValue);
    setNextPage(1);
    setIsDropdownOpen(true);
  };
  useEffect(() => {
    if (searchText !== search) {
      setSearch(searchText);
      setNextPage(1);
      setIsDropdownOpen(true);
    }
  }, [searchText]);

  const handleSelectCollaborator = (collaborator) => {
    if (!selectedCollaborators.some((c) => c.id === collaborator.id)) {
      setSelectedCollaborators([collaborator]);
      onSelectCollaborator(collaborator);
      setSearch('');
      setIsDropdownOpen(false);
    }
  };

  // const handleDeleteCollaborator = (collaboratorToDelete) => {
  //   const updateCollaborators = selectedCollaborators.filter(
  //     (c) => c.id !== collaboratorToDelete.id
  //   );
  //   setSelectedCollaborators(updateCollaborators);
  //   setSearch('');
  // };

  // const displaySelectedCollaborators = () => {
  //   return selectedCollaborators.map((selectedCollaborator) => (
  //     <Chip
  //       key={selectedCollaborator.id}
  //       size='small'
  //       label={selectedCollaborator.fullname}
  //       onDelete={() => handleDeleteCollaborator(selectedCollaborator)}
  //       avatar={chipAvatar(selectedCollaborator)}
  //       style={{ borderColor: _.get(selectedCollaborator, 'team.color.hex') }}
  //       variant='outlined'
  //       className={classes.filterChip}
  //     />
  //   ));
  // };

  // const chipAvatar = (collaborator) => (
  //   <Avatar
  //     src={_.get(collaborator, 'photo')}
  //     entityId={_.get(collaborator, 'id')}
  //     fallbackName={_.get(collaborator, 'fullname')}
  //     fontSize={10}
  //   />
  // );

  const displaySearchedCollaborators = (collaborators, whiteList) => {
    return (
      <div>
        <Grid container>
          {collaborators?.map((collaborator) => {
            return (
              <Grid
                item
                key={collaborator.id}
                className={`${classes.item}`}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                }}
                onClick={() => handleSelectCollaborator(collaborator)}
              >
                <Collaborator
                  collaborator={collaborator}
                  displayTeam
                  noAnimation
                />
              </Grid>
            );
          })}
          <Grid item xs={12}>
            {loading && <Loader centered />}
            {_.get(collaborators, 'length') > 0 && (
              <Grid
                container
                style={{
                  visibility: !loading && !hasError ? 'visible' : 'hidden',
                }}
              >
                <Grid item xs={12}>
                  <DefaultTitle
                    lowercase
                    style={{
                      color: 'rgb(15,111,222)',
                      cursor: 'pointer',
                      zIndex: 20,
                    }}
                    onClick={(e) => {
                      // e.stopPropagation();
                      fetchNextPage();
                    }}
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
          </Grid>
        </Grid>
      </div>
    );
  };

  const handleDocumentClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  // const searchMode = search !== '';

  return (
    <>
      {/* <Grid container direction='row' spacing={4} justifyContent='center'>
        <Grid item xs={12} container direction='column'>
          <Grid xs item>
            {displaySelectedCollaborators(collaborators)}
          </Grid>
        </Grid>
      </Grid> */}
      <div style={{ position: 'relative' }}>
        <Grid container>
          <Grid
            item
            style={{
              zIndex: 10,
            }}
          >
            <div>
              <ChallengeSearchBar
                search={search}
                onChange={handleSearch}
                fullSize
              />
            </div>
          </Grid>
        </Grid>

        {isDropdownOpen && (
          <>
            <div
              ref={overlayRef}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 5,
              }}
            />

            <div
              style={{
                maxHeight: 300,
                padding: 10,
                zIndex: 10,
                left: isMobile ? 0 : 5,
                transform: isMobile && 'translateX(-100px)',
                minWidth: isMobile ? '87vw' : 500,
                maxWidth: isMobile && '87vw',
              }}
              className={classes.dropdown}
              ref={dropdownRef}
            >
              <Grid
                container
                direction='row'
                spacing={4}
                justifyContent='center'
              >
                <Grid item xs={12} container direction='column'>
                  <Grid xs item>
                    {displaySearchedCollaborators(collaborators, false)}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = ({
  challengeParticipantList,
  userList,
  accountDetail,
}) => ({
  challengeParticipantList,
  userList,
  accountDetail,
});
const mapDispatchToProps = (dispatch) => ({
  challengeParticipantListActions: bindActionCreators(
    challengeParticipantListActions,
    dispatch
  ),
  userListAction: bindActionCreators(userListAction, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(withStyles(styles)(ChallengeSearchBarCollaborators)));
