import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import {
  Loader,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  ProgressButton,
  Button,
  TransferList,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as teamGroupTreeActions from '../../../../services/TeamGroups/TeamGroupTree/actions';
import * as challengeDetailActions from '../../../../services/Challanges/ChallengeDetail/actions';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as challengeUpdateActions from '../../../../services/Challanges/ChallengeUpdate/actions';
import _ from 'lodash';

const styles = {
  dialog: {
    width: 900,
    maxWidth: 900,
  },
};

const ChallengeParticipantsEdit = ({
  challengeId,
  open,
  setOpen,
  onSubmit,
  classes,
  ...props
}) => {
  const intl = useIntl();

  const { challenge, loading: challengeLoading } = props.challengeDetail;
  const { teamGroup, loading: teamGroupLoading } = props.teamGroupTree;
  const { teams } = props.teamList;

  const loading = challengeLoading || teamGroupLoading;

  const { loading: updateLoading, success } = props.challengeUpdate;

  const [initialized, setInitialized] = useState(false);
  const [participants, setParticipants] = useState(
    _.get(challenge, 'participants', null)
  );
  const [search, setSearch] = useState('');
  const [displayList, setDisplayList] = useState(true);
  useEffect(() => {
    if (!initialized) {
      if (
        !teams ||
        teams.length === 0 ||
        (teams && teams.length > 0 && !teams[0].collaborators)
      ) {
        props.teamListActions.getTeamList({
          full: false,
          simpleCollaborators: true,
          nestedCollaborators: true,
        });
      }
      if (!teamGroup) {
        props.teamGroupTreeActions.getTeamGroupTree();
      }
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (
      challenge &&
      _.get(challenge, 'participants') &&
      teams &&
      teams.length > 0 &&
      teams[0].collaborators &&
      teamGroup
    ) {
      const currentType = _.get(challenge, 'type');

      const getTeamByCollaboratorList = (collaborator_ids) => {
        return teams.filter((team) => collaborator_ids.indexOf(team.id) >= 0);
      };

      let newParticipants = _.get(challenge, 'participants');

      if (currentType.code !== 'TG') {
        newParticipants =
          currentType.code === 'CC'
            ? _.get(challenge, 'participants')
            : participants
            ? _.flatten(
                getTeamByCollaboratorList(
                  participants.map((p) => p.team.id)
                ).map((team) => team.collaborators)
              )
            : _.flatten(
                getTeamByCollaboratorList(
                  _.get(challenge, 'participants', []).map((p) => p.id)
                ).map((team) => team.collaborators)
              );
      }

      setParticipants(newParticipants);
    }
  }, [props.challengeDetail, props.teamList, props.teamGroupTree]);

  useEffect(() => {
    if (open) {
      setParticipants(null);
      updateChallenge();
    }
  }, [open]);

  useEffect(() => {
    if (!displayList) {
      setOpen(false);
    }
  }, [displayList]);

  const updateChallenge = () => {
    props.challengeDetailActions.getChallengeDetail(challengeId, {
      edit: true,
    });
  };

  const handleSubmit = () => {
    const newChallenge = Object.assign({}, challenge, { participants });
    const challengeFormData = new FormData();
    const start = new Date(parseInt(challenge.start) * 1000);
    const end = challenge.end.toDate2();
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 0);

    challengeFormData.append('id', challenge.id);
    challengeFormData.append('name', challenge.name);
    challengeFormData.append('description', challenge.description);
    challengeFormData.append('start', start.toUTCJSON());
    challengeFormData.append('end', end.toUTCJSON());
    challengeFormData.append('type', challenge.type.id);
    challengeFormData.append('award_type', challenge.award_type);

    challengeFormData.append(
      'participants',
      JSON.stringify(participants.map((p) => ({ id: p.id })))
    );

    props.challengeUpdateActions.updateChallenge(
      newChallenge,
      challengeFormData
    );
  };

  if (success) {
    props.challengeUpdateActions.clearChallengeUpdate();
    onSubmit();
  }

  return (
    <Dialog
      open={open}
      onClose={() => setDisplayList(false)}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle onClose={() => setDisplayList(false)}>
        {intl.formatMessage({ id: 'challenge.update.edit_participants' })}
      </DialogTitle>
      <Formsy onValidSubmit={handleSubmit}>
        <DialogContent>
          {teamGroup &&
            teams &&
            teams.length > 0 &&
            challenge &&
            participants &&
            displayList && (
              <TransferList
                listIn={teamGroup}
                teamGroupMode={_.get(challenge, 'type.code') === 'TG'}
                enableCollaboratorSelect={
                  _.get(challenge, 'type.code') === 'CC'
                }
                enableTeamSelect={_.includes(
                  ['CC', 'CT'],
                  _.get(challenge, 'type.code')
                )}
                onChange={setParticipants}
                onSearch={setSearch}
                selected={participants}
                maxHeight={'60vh'}
                enableSearch
              />
            )}
          {!(
            teamGroup &&
            teams &&
            teams.length > 0 &&
            challenge &&
            participants
          ) && <Loader centered />}
        </DialogContent>

        <div style={{ visibility: search ? 'hidden' : 'visible' }}>
          <DialogActions>
            <ProgressButton
              type='submit'
              text={intl.formatMessage({ id: 'common.submit' })}
              centered
              loading={updateLoading}
              disabled={loading}
            />
            <Button onClick={() => setOpen(false)} color='secondary'>
              {intl.formatMessage({ id: 'common.cancel' })}
            </Button>
          </DialogActions>
        </div>
      </Formsy>
    </Dialog>
  );
};

const mapStateToProps = ({
  challengeDetail,
  challengeUpdate,
  teamGroupTree,
  teamList,
}) => ({
  challengeDetail,
  challengeUpdate,
  teamGroupTree,
  teamList,
});

const mapDispatchToProps = (dispatch) => ({
  challengeDetailActions: bindActionCreators(challengeDetailActions, dispatch),
  teamGroupTreeActions: bindActionCreators(teamGroupTreeActions, dispatch),
  teamListActions: bindActionCreators(teamListActions, dispatch),
  challengeUpdateActions: bindActionCreators(challengeUpdateActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChallengeParticipantsEdit));
