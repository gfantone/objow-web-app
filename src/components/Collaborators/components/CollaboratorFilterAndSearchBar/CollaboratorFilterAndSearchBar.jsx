import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {
  ChallengeCollaboratorFilter,
  ChallengeSearchBarCollaborators,
} from '../../../../scenes/Challenges/components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import * as collaboratorDataListActions from '../../../../services/CollaboratorData/CollaboratorDataList/actions';
import * as challengeParticipantListActions from '../../../../services/ChallengeParticipants/ChallengeParticipantList/actions';

import _ from 'lodash';

const CollaboratorFilterAndSearchBar = ({
  participantTeamIds,
  participantIds,
  hideSearchBar,
  open,
  onClose,
  onChange,
  teamGroup,
  team,
  year,
  start,
  end,
  type,
  onLoaded,
  fetchUsers,
  usersState,
  collaborator: collaboratorId,
  width,
  ...props
}) => {
  const { account } = props.accountDetail;
  const [collaborator, setCollaborator] = useState(collaboratorId);
  const [searchedCollaborator, setSearchedCollaborator] = useState();
  const isMobile = isWidthDown('sm', width);

  const isManager = account.role.code === 'M';

  useEffect(() => {
    if (collaborator) {
      setSearchedCollaborator();
    }
  }, [collaborator]);

  useEffect(() => {
    if (searchedCollaborator) {
      setCollaborator();
    }
  }, [searchedCollaborator]);
  const sizeDropdownForManager = isManager && (isMobile ? '70vw' : '20vw');

  if (account.isJtiEnv) {
    return <></>;
  }

  return (
    <>
      <Grid container style={{ position: 'relative' }}>
        <Grid item>
          <ChallengeCollaboratorFilter
            onChange={(team, collaborator) => {
              setCollaborator(collaborator);
              onChange(team, collaborator);
            }}
            collaborator={collaborator}
            searchedCollaborator={searchedCollaborator}
            scopeTeams={participantTeamIds}
            scopeCollaborators={participantIds}
            open={open}
            onClose={onClose}
            teamGroup={teamGroup}
            team={team}
            year={year}
            start={start}
            end={end}
            type={type}
            onLoaded={onLoaded}
            dropdownWidth={sizeDropdownForManager}
          />
        </Grid>

        {!hideSearchBar && _.get(account, 'role.code') !== 'C' && (
          <Grid
            item
            xs={8}
            md={12}
            style={{ position: 'absolute', top: 0, left: 107 }}
          >
            <ChallengeSearchBarCollaborators
              fetchUsers={fetchUsers}
              usersState={usersState}
              onSelectCollaborator={(collaborator) => {
                setSearchedCollaborator(collaborator);
                onChange(null, collaborator?.id);
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};
const mapStateToProps = ({
  challengeParticipantList,
  collaboratorDataList,
  accountDetail,
}) => ({
  challengeParticipantList,
  collaboratorDataList,
  accountDetail,
});
const mapDispatchToProps = (dispatch) => ({
  collaboratorDataListActions: bindActionCreators(
    collaboratorDataListActions,
    dispatch
  ),
  challengeParticipantListActions: bindActionCreators(
    challengeParticipantListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(CollaboratorFilterAndSearchBar));
