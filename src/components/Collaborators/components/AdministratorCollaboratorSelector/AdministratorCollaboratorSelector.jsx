import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Collaborator,
  DefaultTitle,
  EmptyState,
  Loader,
  TeamSelector,
} from '../../../../components';
import { useIntl } from 'react-intl';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as userListActions from '../../../../services/Users/UserList/actions';

import { ChallengeSearchBar } from '../../../../scenes/Challenges/components';

const styles = {
  panel: {
    backgroundColor: 'initial',
    borderRadius: 'initial',
    boxShadow: 'none',
  },
  panelSummary: {
    padding: 'initial',
  },
  panelDetails: {
    padding: 'initial',
    paddingBottom: 24,
  },
};

const AdministratorCollaboratorSelector = ({
  onClick,
  contextUrl,
  contextUrlOptions,
  disableRedirect,
  loadingAdmin,
  userListActions,
  forceSelector,
  full,
  ...props
}) => {
  const intl = useIntl();
  const { classes } = props;
  const { teams, loading } = props.teamList;
  const [team, setTeam] = useState();
  const [search, setSearch] = useState('');

  const { account } = props.accountDetail;
  const { users: collaborators } = props.userList;

  const urlParams = contextUrlOptions
    ? Object.keys(contextUrlOptions).reduce((acc, key) => {
        if (!acc) {
          acc = `${acc}?${key}=${contextUrlOptions[key]}`;
        } else {
          acc = `${acc}&${key}=${contextUrlOptions[key]}`;
        }
        return acc;
      }, '')
    : '';
  function renderData() {
    return (
      <div>
        {team && !disableRedirect ? (
          <Redirect push to={`${contextUrl}${team}${urlParams}`} />
        ) : (
          <TeamSelector
            full={!!full}
            onClick={(teamId, type) => {
              setTeam(teamId);
              if (onClick) {
                onClick(teamId, type);
              }
            }}
            teamGroupSelectable={props.teamGroupSelectable}
          />
        )}
      </div>
    );
  }

  useEffect(() => {
    if (search) {
      userListActions.getUserList({
        isActive: true,
        full: !!full,
        limit: 30,
        search: search,
        teamGroupId: account.team_group.id,
        roleCode: 'C',
      });
    }
  }, [search]);

  const handleSearch = (newValue) => {
    setSearch(newValue);
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item style={{ marginBottom: 10 }} xs={12} sm={4}>
          <ChallengeSearchBar
            search={search}
            onChange={handleSearch}
            fullSize
          />
        </Grid>
      </Grid>
      {search && collaborators === null ? (
        <Loader centered />
      ) : (
        <Grid container spacing={2}>
          {search &&
            collaborators?.map((collaborator) => {
              return (
                <Grid
                  key={collaborator.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  onClick={() => {
                    if (collaborator?.team?.id) {
                      setTeam(collaborator.team.id)
                    }
                    props.onClickCollaborator(collaborator)
                  }}
                >
                  <Collaborator
                    key={collaborator.id}
                    collaborator={collaborator}
                  />
                </Grid>
              );
            })}
        </Grid>
      )}
      {renderData()}
    </>
  );
};

const mapStateToProps = ({
  teamList,
  userList,
  teamCollaboratorList,
  accountDetail,
}) => ({
  teamList,
  userList,
  accountDetail,
  loadingAdmin: teamCollaboratorList.loading,
});

const mapDispatchToProps = (dispatch) => ({
  teamListActions: bindActionCreators(teamListActions, dispatch),
  userListActions: bindActionCreators(userListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AdministratorCollaboratorSelector));
