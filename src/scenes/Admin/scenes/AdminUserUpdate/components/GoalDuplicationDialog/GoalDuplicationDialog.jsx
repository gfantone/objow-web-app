import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
} from '@material-ui/core';
import {
  Button,
  DefaultText,
  ProgressButton,
  Select,
  Loader,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';
import * as collaboratorGoalListDuplicationActions from '../../../../../../services/CollaboratorGoals/CollaboratorGoalListDuplication/actions';
import * as teamListActions from '../../../../../../services/Teams/TeamList/actions';
import '../../../../../../helpers/StringHelper';
import _ from 'lodash';

const GoalDuplicationDialog = ({ user, open, setOpen, ...props }) => {
  const intl = useIntl();
  const { success, loading } = props.collaboratorGoalListDuplication;
  const [collaborator, setCollaborator] = React.useState(null);
  const [duplicationOpen, setDuplicationOpen] = React.useState(open);
  const [duplicationConfirmationOpen, setDuplicationConfirmationOpen] =
    React.useState(false);
  const [team, setTeam] = React.useState(null);
  const { teams, loading: teamLoading } = props.teamList;
  const selectedTeam = team ? teams.filter((x) => x.id === team)[0] : null;
  const collaborators = selectedTeam
    ? selectedTeam.collaborators.filter((x) => x.id !== user.id)
    : _.flatten(teams.map((team) => team.collaborators));
  const selectedCollaborator = collaborator
    ? collaborators.filter((x) => x.id === collaborator)[0]
    : null;
  const selectedCollaboratorFullname = selectedCollaborator
    ? selectedCollaborator.fullname
    : '';

  const teamsLoaded =
    teams && !teamLoading && teams[0] && teams[0].collaborators;
  const [initialized, setInitialized] = React.useState(false);

  useEffect(() => {
    props.collaboratorGoalListDuplicationActions.clearCollaboratorGoalListDuplication();
    if (!initialized) {
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      props.teamListActions.getTeamList({ simpleCollaborators: true });
    }
  }, [initialized]);

  useEffect(() => {
    setOpen(duplicationOpen);
  }, [duplicationOpen]);

  useEffect(() => {
    setDuplicationOpen(open);
  }, [open]);

  if (success) {
    props.collaboratorGoalListDuplicationActions.clearCollaboratorGoalListDuplication();
    props.history.goBack();
  }

  function handleCollaboratorChange(newCollaborator) {
    newCollaborator
      ? setCollaborator(Number(newCollaborator))
      : setCollaborator(null);
  }

  function handleConfirmClick(e) {
    e.preventDefault();
    e.stopPropagation();
    props.collaboratorGoalListDuplicationActions.duplicateCollaboratorGoalList(
      collaborator,
      user.id,
    );
  }

  function handleTeamChange(newTeam) {
    newTeam ? setTeam(Number(newTeam)) : setTeam(null);
  }

  function handleValidSubmit(model) {
    setDuplicationConfirmationOpen(true);
  }

  return (
    <div>
      <Dialog open={duplicationOpen} onClose={() => setDuplicationOpen(false)}>
        <Formsy>
          <DialogTitle>
            {intl.formatMessage({ id: 'admin.goal.duplication.dialog_title' })}
          </DialogTitle>
          <DialogContent>
            {!teamsLoaded && <Loader centered />}
            {teamsLoaded && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DefaultText>
                    {intl
                      .formatMessage({
                        id: 'admin.goal.duplication.dialog_message',
                      })
                      .format(user.fullname)}
                  </DefaultText>
                </Grid>
                <Grid item xs={12}>
                  {teams && (
                    <Select
                      emptyText={intl.formatMessage({
                        id: 'filter.all_team_label',
                      })}
                      fullWidth
                      label={intl.formatMessage({ id: 'filter.team_label' })}
                      name="team"
                      optionValueName="id"
                      options={teams}
                      optionTextName="name"
                      onChange={handleTeamChange}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  {collaborators && (
                    <Select
                      emptyText={intl.formatMessage({
                        id: 'filter.collaborator_all_option',
                      })}
                      fullWidth
                      label={intl.formatMessage({
                        id: 'filter.collaborator_label',
                      })}
                      name="collaborator"
                      optionValueName="id"
                      options={collaborators}
                      optionTextName="fullname"
                      required
                      validationErrors={{
                        isDefaultRequiredValue: intl.formatMessage({
                          id: 'common.form.required_error',
                        }),
                      }}
                      onChange={handleCollaboratorChange}
                    />
                  )}
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={() => setDuplicationOpen(false)}>
              {intl.formatMessage({ id: 'common.cancel' })}
            </Button>
            <Button
              type="button"
              onClick={() => setDuplicationConfirmationOpen(true)}
            >
              {intl.formatMessage({ id: 'common.submit' })}
            </Button>
          </DialogActions>
        </Formsy>
      </Dialog>
      <Dialog
        open={duplicationConfirmationOpen || loading}
        onClose={() => setDuplicationConfirmationOpen(false)}
      >
        <Formsy>
          <DialogContent>
            <DefaultText>
              {intl
                .formatMessage({
                  id: 'admin.goal.duplication.dialog_confirmation_message',
                })
                .format(user.fullname, selectedCollaboratorFullname)}
            </DefaultText>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              onClick={() => setDuplicationConfirmationOpen(false)}
            >
              {intl.formatMessage({ id: 'common.no' })}
            </Button>
            <ProgressButton
              type="submit"
              text={intl.formatMessage({ id: 'common.yes' })}
              loading={loading}
              onClick={handleConfirmClick}
            />
          </DialogActions>
        </Formsy>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ collaboratorGoalListDuplication, teamList }) => ({
  collaboratorGoalListDuplication,
  teamList,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorGoalListDuplicationActions: bindActionCreators(
    collaboratorGoalListDuplicationActions,
    dispatch,
  ),
  teamListActions: bindActionCreators(teamListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(GoalDuplicationDialog));
