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
} from '../../../../../../../../components';
import * as goalDetailActions from '../../../../../../../../services/Goals/GoalDetail/actions';
import * as teamPlayerGoalListActions from '../../../../../../../../services/TeamPlayerGoals/TeamPlayerGoalList/actions';
import * as teamPlayerGoalListUpdateActions from '../../../../../../../../services/TeamPlayerGoals/TeamPlayerGoalListUpdate/actions';
import '../../../../../../../../helpers/FormsyHelper';
import { injectIntl } from 'react-intl';
import * as Resources from '../../../../../../../../Resources';
import { toast } from 'react-toastify';

const styles = {
  title: {
    marginBottom: 16,
  },
  indicators: {
    marginBottom: 32,
  },
  formFooter: {
    marginTop: 32,
  },
  error: {
    marginBottom: 16,
  },
};

class TeamCollaboratorGoalList extends Component {
  constructor(props) {
    super(props);
    this.date = null;
    this.state = {
      targetSum: null,
    };
  }

  loadData(props) {
    const date = props.date;
    if (date != this.date) {
      this.date = date;
      const definitionId = props.goalDefinitionDetail.definition.id;
      props.goalDetailActions.getGoalDetail(definitionId, date);
      props.teamPlayerGoalListActions.getTeamPlayerGoalList(definitionId, date);
    }
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(props) {
    this.loadData(props);
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
      if (key != 'remainingTarget') {
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
    this.props.teamPlayerGoalListUpdateActions.updateTeamPlayerGoalList(goals);
  }

  renderForm() {
    const { intl } = this.props;
    const { classes } = this.props;
    const { goals } = this.props.teamPlayerGoalList;
    const { goal: parentGoal } = this.props.goalDetail;
    const { loading } = this.props.teamPlayerGoalListUpdate;
    const { account } = this.props.accountDetail;
    const goalCount = goals.length;
    const isRate = parentGoal.definition.kpi.unit.isRate;
    const maxTarget = parentGoal.target;
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

    return (
      <div>
        <DefaultTitle className={classes.title}>Indicateurs</DefaultTitle>
        <div className={classes.indicators}>
          <Card>
            <Grid container justify='space-between'>
              <Grid item>
                <DefaultText>
                  {intl.formatMessage({
                    id: 'admin.goal.edit.max_target_label',
                  })}
                </DefaultText>
                <InfoText>{maxTarget}</InfoText>
              </Grid>
              <Grid item>
                <DefaultText>
                  {intl.formatMessage({
                    id: 'admin.goal.edit.all_target_label',
                  })}
                </DefaultText>
                <InfoText>{allTarget}</InfoText>
              </Grid>
              <Grid item>
                <DefaultText>
                  {intl.formatMessage({
                    id: 'admin.goal.edit.remaining_target_label',
                  })}
                </DefaultText>
                {remainingTarget >= 0 && (
                  <AccentText>{remainingTarget}</AccentText>
                )}
                {remainingTarget < 0 && (
                  <ErrorText>{remainingTarget}</ErrorText>
                )}
              </Grid>
            </Grid>
          </Card>
        </div>
        <Formsy
          onChange={this.handleChange.bind(this)}
          onValidSubmit={this.handleSubmit.bind(this)}
        >
          <Grid container spacing={2}>
            {goals.map((goal, index) => {
              return (
                <Grid key={goal.id} item xs={3}>
                  <TextField
                    type='number'
                    name={goal.id}
                    label={goal.team.name}
                    initial={goal.target}
                    fullWidth
                    required
                    disabled={!editable || readonly}
                    validations={{
                      isMoreThanOrEquals: 0,
                    }}
                    validationErrors={{
                      isDefaultRequiredValue: intl.formatMessage({
                        id: 'common.form.required_error',
                      }),
                      isMoreThanOrEquals:
                        "L'objectif doit être supérieur ou égal à 0.",
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
          {!readonly && (
            <div className={classes.formFooter}>
              {!canSubmit && (
                <ErrorText className={classes.error} align='center'>
                  Veuillez respecter l'objectif total alloué pour la période
                  sélectionnée
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
          )}
        </Formsy>
      </div>
    );
  }

  render() {
    const { intl } = this.props;
    const { goals, loading: teamPlayerGoalListLoading } =
      this.props.teamPlayerGoalList;
    const { loading: goalDetailLoading } = this.props.goalDetail;
    const { success, error } = this.props.teamPlayerGoalListUpdate;
    const loading = teamPlayerGoalListLoading || goalDetailLoading;
    const hasGoals = goals.length > 0;

    if (success) {
      // this.props.teamPlayerGoalListUpdateActions.clearGoalDefinitionUpdate()
      // this.props.history.goBack()
      this.props.teamPlayerGoalListUpdateActions.updateTeamPlayerGoalListClear();
      toast.success(intl.formatMessage({ id: 'admin.goal.edit.success' }));
    }

    if (error) {
      this.props.teamPlayerGoalListUpdateActions.updateTeamPlayerGoalListClear();
      toast.error(intl.formatMessage({ id: 'admin.goal.edit.error' }));
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && hasGoals && this.renderForm()}
        {!loading && !hasGoals && this.renderEmptyState()}
      </div>
    );
  }
}

const mapStateToProps = ({
  goalDefinitionDetail,
  goalDetail,
  teamPlayerGoalList,
  teamPlayerGoalListUpdate,
  accountDetail,
}) => ({
  goalDefinitionDetail,
  goalDetail,
  teamPlayerGoalList,
  teamPlayerGoalListUpdate,
  accountDetail,
});

const mapDispatchToProps = (dispatch) => ({
  goalDetailActions: bindActionCreators(goalDetailActions, dispatch),
  teamPlayerGoalListActions: bindActionCreators(
    teamPlayerGoalListActions,
    dispatch
  ),
  teamPlayerGoalListUpdateActions: bindActionCreators(
    teamPlayerGoalListUpdateActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(TeamCollaboratorGoalList)));
