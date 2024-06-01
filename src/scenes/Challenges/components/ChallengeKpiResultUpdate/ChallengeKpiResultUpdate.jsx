import React, { useState, useRef, useEffect } from 'react';
import Formsy from 'formsy-react';
import { KpiResultUpdate } from '../../../../components';
import {
  ChallengeKpiCollaboratorUpdate,
  CollaboratorDataSpreadsheet,
  CollaboratorInputSpreadsheet,
  CollaboratorInputCreateForm,
} from './components';
import { ChallengeCollaboratorFilter } from '../';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { useIntl, injectIntl } from 'react-intl';
import { Grid, IconButton, withWidth, isWidthUp } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExchangeAlt,
  faArrowUp,
  faArrowDown,
  faChevronLeft,
  faFileDownload,
} from '@fortawesome/free-solid-svg-icons';
import * as collaboratorDataListActions from '../../../../services/CollaboratorData/CollaboratorDataList/actions';
import * as collaboratorInputListActions from '../../../../services/CollaboratorInput/CollaboratorInputList/actions';
import * as collaboratorDataUpdateActions from '../../../../services/CollaboratorData/CollaboratorDataUpdate/actions';
import * as collaboratorInputCreationActions from '../../../../services/CollaboratorInput/CollaboratorInputCreation/actions';
import * as challengeParticipantListActions from '../../../../services/ChallengeParticipants/ChallengeParticipantList/actions';
import * as kpiDetailActions from '../../../../services/Kpis/KpiDetail/actions';
import api from '../../../../data/api/api';
import _ from 'lodash';

const styles = {
  spreadsheet: {
    paddingLeft: 0,
    width: '100%',
  },
  userAvatar: {
    width: 30,
    height: 30,
  },
  link: {
    fontSize: 16,
    cursor: 'pointer',
    alignSelf: 'flex-start',
    color: 'rgb(15,111,222)',
    opacity: 1,
  },
};

const ChallengeKpiResultUpdate = ({
  goal,
  setGoal,
  width,
  classes,
  collaboratorEdit,
  challenge,
  ...props
}) => {
  const fetchUsers = (options = {}) => {
    props.challengeParticipantListActions.getChallengeParticipantCollaboratorList(
      {
        challengeId: challenge.sourceId,
        ...options,
      }
    );
  };
  return (
    <KpiResultUpdate
      kpi={
        goal
          ? {
              id: goal.kpiId,
              collaborator_editable: goal.kpiCollaboratorEditable,
              name: goal.name,
            }
          : null
      }
      coverImage={challenge.image || challenge.custom_image}
      onClose={setGoal}
      width={width}
      classes={classes}
      collaboratorEdit={collaboratorEdit}
      challenge={challenge}
      participantIds={challenge.participantIds}
      participantTeamIds={challenge.participantTeamIds}
      start={challenge.start}
      end={challenge.end}
      fetchUsers={fetchUsers}
      usersState={{
        users: props.challengeParticipantList.participants,
        loading: props.challengeParticipantList.loading,
        hasError: props.challengeParticipantList.hasError,
      }}
      {...props}
    />
  );
};

const mapStateToProps = ({
  collaboratorDataList,
  collaboratorDataUpdate,
  kpiDetail,
  collaboratorInputCreation,
  collaboratorInputList,
  challengeParticipantList,
}) => ({
  collaboratorDataList,
  collaboratorInputList,
  collaboratorDataUpdate,
  collaboratorInputCreation,
  kpiDetail,
  challengeParticipantList,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorDataListActions: bindActionCreators(
    collaboratorDataListActions,
    dispatch
  ),
  collaboratorInputListActions: bindActionCreators(
    collaboratorInputListActions,
    dispatch
  ),
  collaboratorDataUpdateActions: bindActionCreators(
    collaboratorDataUpdateActions,
    dispatch
  ),
  collaboratorInputCreationActions: bindActionCreators(
    collaboratorInputCreationActions,
    dispatch
  ),
  kpiDetailActions: bindActionCreators(kpiDetailActions, dispatch),
  challengeParticipantListActions: bindActionCreators(
    challengeParticipantListActions,
    dispatch
  ),
});

export default withWidth()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ChallengeKpiResultUpdate))
);
