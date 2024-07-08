import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  AccentText,
  Card,
  DefaultText,
  DefaultTitle,
  EmptyState,
  ErrorText,
  InfoText,
  Loader,
  ProgressButton,
  TextField,
  Avatar,
} from '../../../../../../components';
import * as collaboratorGoalListActions from '../../../../../../services/CollaboratorGoals/CollaboratorGoalList/actions';
import * as playerGoalListUpdateActions from '../../../../../../services/PlayerGoals/PlayerGoalListUpdate/actions';
import * as teamCollaboratorGoalDetailActions from '../../../../../../services/TeamCollaboratorGoals/TeamCollaboratorGoalDetail/actions';
import '../../../../../../helpers/FormsyHelper';
import * as Resources from '../../../../../../Resources';
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import { toast } from 'react-toastify';

const styles = {
  title: {
    marginBottom: 16,
  },
  indicators: {
    marginBottom: 32,
  },
  indicatorsContent: {
    margin: 16,
  },
  formFooter: {
    marginTop: 32,
  },
  error: {
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
  },
};

class CollaboratorGoalList extends Component {
  constructor(props) {
    super(props);
    this.date = null;
    this.team = null;
    this.state = {
      targetSum: null,
    };
  }

  componentDidMount() {
    const { goal } = this.props.collaboratorGoalDetail;
    this.props.teamCollaboratorGoalDetailActions.getTeamCollaboratorGoalDetail(
      goal.teamCollaboratorGoalId
    );
    this.props.collaboratorGoalListActions.getCollaboratorGoalListByGoal(
      goal.id
    );
  }

  renderLoader() {
    return (
      <div>
        <Loader centered />
      </div>
    );
  }

  renderEmptyState() {
    const { intl } = this.props;
    return (
      <div>
        <EmptyState
          title={intl.formatMessage({
            id: 'admin.goal.list.empty_state_title',
          })}
          message={intl.formatMessage({
            id: 'admin.goal.list.empty_state_message',
          })}
        />
      </div>
    );
  }

  convertToGoals(model) {
    const goals = [];
    const keys = Object.keys(model);
    keys.map((key) => {
      if (key !== 'remainingTarget') {
        const goal = { id: key, target: model[key] };
        goals.push(goal);
      }
    });
    return goals;
  }

  handleChange(model) {
    const goals = this.convertToGoals(model);
    var targetSum = goals
      .map((goal) => Number(goal.target))
      .reduce((a, b) => a + b);
    this.setState({
      ...this.state,
      targetSum: targetSum,
    });
  }

  handleSubmit(model) {
    const goals = this.convertToGoals(model);
    this.props.playerGoalListUpdateActions.updatePlayerGoalList(goals);
  }

  renderForm() {
    const { intl } = this.props;
    const { classes } = this.props;
    const { goals } = this.props.collaboratorGoalList;
    const { goal: parentGoal } = this.props.teamCollaboratorGoalDetail;
    const { loading, success, error } = this.props.playerGoalListUpdate;
    const { account } = this.props.accountDetail;
    const goalCount = goals.length;
    const isRate = parentGoal.isRate;
    const maxTarget = parentGoal.maxTarget;
    var initialAllTarget = goals
      .map((goal) => Number(goal.target))
      .reduce((a, b) => a + b);
    if (isRate)
      initialAllTarget =
        goalCount > 0 ? Math.ceil(initialAllTarget / goalCount) : 0;
    var allTarget = initialAllTarget;
    if (this.state.targetSum != null && !isRate)
      allTarget = this.state.targetSum;
    if (this.state.targetSum != null && isRate)
      allTarget =
        goalCount > 0 ? Math.ceil(this.state.targetSum / goalCount) : 0;

    const remainingTarget = maxTarget - allTarget;
    const canSubmit =
      remainingTarget >= 0 || parentGoal.definition.allow_over_target;
    const now = new Date();
    const isPast = new Date(parentGoal.end * 1000) < now;
    const readonly = !parentGoal.definition.isActive;
    const editable =
      !isPast ||
      (parentGoal.definition.past_editable && account.role.code === 'A');

    if (success) {
      this.props.playerGoalListUpdateActions.updatePlayerGoalListClear();
      toast.success(
        intl.formatMessage({ id: 'common.update_success_message' })
      );
    }
    if (error) {
      this.props.playerGoalListUpdateActions.updatePlayerGoalListClear();
      toast.error(intl.formatMessage({ id: 'common.update_error_message' }));
    }

    return (
      <div>
        <DefaultTitle className={classes.title}>
          {intl.formatMessage({ id: 'admin.goal.edit.title' })}
        </DefaultTitle>
        <div className={classes.indicators}>
          <Card>
            <div className={classes.indicatorsContent}>
              <Grid container justify='space-between'>
                <Grid item>
                  <DefaultText>
                    {intl.formatMessage({
                      id: 'admin.goal.edit.max_target_label',
                    })}
                  </DefaultText>
                  <InfoText>{maxTarget.toLocaleString()}</InfoText>
                </Grid>
                <Grid item>
                  <DefaultText>
                    {intl.formatMessage({
                      id: 'admin.goal.edit.all_target_label',
                    })}
                  </DefaultText>
                  <InfoText>{allTarget.toLocaleString()}</InfoText>
                </Grid>
                <Grid item>
                  <DefaultText>
                    {intl.formatMessage({
                      id: 'admin.goal.edit.remaining_target_label',
                    })}
                  </DefaultText>
                  {remainingTarget >= 0 && (
                    <AccentText>{remainingTarget.toLocaleString()}</AccentText>
                  )}
                  {remainingTarget < 0 && (
                    <ErrorText>{remainingTarget.toLocaleString()}</ErrorText>
                  )}
                </Grid>
              </Grid>
            </div>
          </Card>
        </div>
        <Formsy
          onChange={this.handleChange.bind(this)}
          onValidSubmit={this.handleSubmit.bind(this)}
        >
          <Grid container spacing={2}>
            {goals.map((goal) => {
              const photo = goal.collaborator.photo
                ? goal.collaborator.photo
                : '/assets/img/user/avatar.svg';

              return (
                <Grid
                  key={goal.id}
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  container
                  spacing={1}
                >
                  <Grid item>
                    <Avatar
                      src={photo}
                      className={classes.avatar}
                      entityId={_.get(goal, 'collaborator.id')}
                      fallbackName={_.get(goal, 'collaborator.fullname')}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      lowercase
                      type='number'
                      name={goal.id}
                      label={goal.collaborator.fullname}
                      initial={goal.target}
                      required
                      validations={{
                        isMoreThanOrEquals: 0,
                      }}
                      validationErrors={{
                        isDefaultRequiredValue: intl.formatMessage({
                          id: 'common.form.required_error',
                        }),

                        isMoreThanOrEquals: intl.formatMessage({
                          id: 'common.form.is_more_than_or_equals_0_error',
                        }),
                      }}
                      disabled={!editable || readonly}
                    />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <div className={classes.formFooter}>
            {!canSubmit && (
              <ErrorText className={classes.error} align='center'>
                {intl.formatMessage({ id: 'admin.goal.edit.error_text' })}
              </ErrorText>
            )}
            <ProgressButton
              type='submit'
              text={intl.formatMessage({ id: 'common.submit' })}
              loading={loading}
              disabled={!canSubmit || !editable || readonly}
              centered
            />
          </div>
        </Formsy>
      </div>
    );
  }

  render() {
    const { goals, loading: goalLoading } = this.props.collaboratorGoalList;
    const { goal: parentGoal, loading: parentLoading } =
      this.props.teamCollaboratorGoalDetail;
    const loading = goalLoading || parentLoading;
    return (
      <div>
        {loading && this.renderLoader()}
        {!loading &&
          goals &&
          goals.length > 0 &&
          parentGoal &&
          this.renderForm()}
        {!loading &&
          goals &&
          goals.length == 0 &&
          parentGoal &&
          this.renderEmptyState()}
      </div>
    );
  }
}

const mapStateToProps = ({
  collaboratorGoalList,
  goalDefinitionDetail,
  playerGoalListUpdate,
  collaboratorGoalDetail,
  accountDetail,
  teamCollaboratorGoalDetail,
}) => ({
  collaboratorGoalList,
  goalDefinitionDetail,
  playerGoalListUpdate,
  collaboratorGoalDetail,
  teamCollaboratorGoalDetail,
  accountDetail,
});

const mapDispatchToProps = (dispatch) => ({
  teamCollaboratorGoalDetailActions: bindActionCreators(
    teamCollaboratorGoalDetailActions,
    dispatch
  ),
  collaboratorGoalListActions: bindActionCreators(
    collaboratorGoalListActions,
    dispatch
  ),
  playerGoalListUpdateActions: bindActionCreators(
    playerGoalListUpdateActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(CollaboratorGoalList)));
