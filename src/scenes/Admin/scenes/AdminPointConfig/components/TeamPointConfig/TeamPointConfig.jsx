import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Formsy from 'formsy-react';
import {
  Card,
  DefaultTitle,
  Loader,
  ProgressButton,
  Select,
  TextField,
} from '../../../../../../components';
import * as challengeTypeListActions from '../../../../../../services/ChallengeTypes/ChallengeTypeList/actions';
import * as challengeTypeListUpdateActions from '../../../../../../services/ChallengeTypes/ChallengeTypeListUpdate/actions';
import * as configListActions from '../../../../../../services/Configs/ConfigList/actions';
import * as configListUpdateActions from '../../../../../../services/Configs/ConfigListUpdate/actions';
import './helpers/FormsyHelper';
import * as Resources from '../../../../../../Resources';
import { injectIntl } from 'react-intl';
import { toast } from 'react-toastify';

const styles = {
  title: {
    marginBottom: 16,
  },
  form: {
    marginBottom: 32,
  },
  arrow: {
    marginTop: 24,
  },
};

const rules = [
  { id: 'P', name: '1€ = 10 PTS' },
  { id: 'L', name: 'Libre' },
];

class TeamPointConfig extends Component {
  constructor(props) {
    super(props);
    this.initialized = false;
    this.state = {
      ruleId: null,
      rule: '',
      global: {
        id: null,
        points: { value: 0, display: true },
        budget: { value: 0, display: true },
      },
      goals: {
        id: null,
        points: { value: 0, display: true },
        percentage: { value: 0, display: true },
      },
      challenges: {
        id: null,
        points: { value: 0, display: true },
        percentage: { value: 0, display: true },
      },
    };
    this.props.configListUpdateActions.clearConfigListUpdate();
  }

  componentDidMount(props) {
    const periodId = this.props.period;
    this.props.configListActions.getConfigList(periodId);
  }

  componentWillReceiveProps(props) {
    const { configs } = props.configList;
    if (!this.initialized && configs) {
      const rule = configs.find((x) => x.code == 'TCRP');
      const global = configs.find((x) => x.code == 'TPA');
      const goals = configs.find((x) => x.code == 'TPG');

      this.initialized = true;
      this.setState({
        ...this.state,
        ruleId: rule.id,
        rule: rule.value,
        global: {
          id: global.id,
          points: { value: global.value, display: true },
          budget: { value: global.value / 10, display: true },
        },
        goals: {
          id: goals.id,
          points: { value: goals.value, display: true },
          percentage: {
            value:
              global.value > 0
                ? Number(((goals.value / global.value) * 100).toFixed(2))
                : 0,
            display: true,
          },
        },
      });
    }
  }

  handleRuleChange(value) {
    this.setState({
      ...this.state,
      rule: value,
    });
  }

  handleBudgetChange(value) {
    const points = value * 10;
    var global = this.state.global;
    var goals = this.state.goals;

    global.budget.value = value;
    global.points.value = points;
    goals.points.value = Math.round(points * (goals.percentage.value / 100));

    global.points.display = false;
    goals.points.display = false;

    this.setState(
      {
        ...this.state,
        global: global,
        goals: goals,
      },
      () => {
        global.points.display = true;
        goals.points.display = true;

        this.setState({
          ...this.state,
          global: global,
          goals: goals,
        });
      }
    );
  }

  handleGlobalPointsChange(value) {
    const budget = (value / 10).toFixed(2);
    var global = this.state.global;
    var goals = this.state.goals;

    global.points.value = value;
    global.budget.value = budget;
    goals.points.value = Math.round(value * (goals.percentage.value / 100));

    global.budget.display = false;
    goals.points.display = false;

    this.setState(
      {
        ...this.state,
        global: global,
        goals: goals,
      },
      () => {
        global.budget.display = true;
        goals.points.display = true;

        this.setState({
          ...this.state,
          global: global,
          goals: goals,
        });
      }
    );
  }

  handlePercentageChange = (name) => (value) => {
    const points = Math.round(this.state.global.points.value * (value / 100));
    var config = this.state[name];
    config.percentage.value = value;
    config.points.value = points;
    config.points.display = false;
    this.setState(
      {
        ...this.state,
        [name]: config,
      },
      () => {
        config.points.display = true;
        this.setState({
          ...this.state,
          [name]: config,
        });
      }
    );
  };

  handlePointsChange = (name) => (value) => {
    const percentage = ((value / this.state.global.points.value) * 100).toFixed(
      2
    );
    var config = this.state[name];
    config.points.value = value;
    config.percentage.value = percentage;
    config.percentage.display = false;
    this.setState(
      {
        ...this.state,
        [name]: config,
      },
      () => {
        config.percentage.display = true;
        this.setState({
          ...this.state,
          [name]: config,
        });
      }
    );
  };

  handleSubmit(model) {
    const configs = [
      { id: this.state.ruleId, value: model.rule },
      { id: this.state.global.id, value: model.global },
      { id: this.state.goals.id, value: model.goals },
    ];

    this.props.configListUpdateActions.updateConfigList(configs);
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { intl } = this.props;
    const { classes } = this.props;

    const { loading: configListUpdateLoading } = this.props.configListUpdate;
    const loading = configListUpdateLoading;

    return (
      <div>
        <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
          <Grid container spacing={4}>
            <Grid item xs={12} container spacing={1}>
              <Grid item xs={12}>
                <DefaultTitle isContrast>
                  {intl.formatMessage({
                    id: 'admin.point_config.total_title_team',
                  })}
                </DefaultTitle>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Select
                        name='rule'
                        label={intl.formatMessage({
                          id: 'admin.point_config.point_rule',
                        })}
                        fullWidth
                        options={rules}
                        optionValueName='id'
                        optionTextName='name'
                        initial={this.state.rule}
                        onChange={this.handleRuleChange.bind(this)}
                      />
                    </Grid>
                    {this.state.rule == 'P' && (
                      <Grid item>
                        {this.state.global.budget.display && (
                          <TextField
                            name='globalPercentage'
                            type='number'
                            label={intl.formatMessage({
                              id: 'admin.point_config.budget',
                            })}
                            initial={this.state.global.budget.value}
                            onChange={this.handleBudgetChange.bind(this)}
                          />
                        )}
                      </Grid>
                    )}
                    {this.state.rule == 'P' && (
                      <Grid item>
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          className={classes.arrow}
                        />
                      </Grid>
                    )}
                    <Grid item>
                      {this.state.global.points.display && (
                        <TextField
                          name='global'
                          type='number'
                          label='PTS'
                          initial={this.state.global.points.value}
                          onChange={this.handleGlobalPointsChange.bind(this)}
                          required
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={6} container spacing={1}>
              <Grid item xs={12}>
                <DefaultTitle isContrast>
                  {intl.formatMessage({ id: 'admin.goal.title' })}
                </DefaultTitle>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <Grid container spacing={2}>
                    <Grid item>
                      {this.state.goals.percentage.display && (
                        <TextField
                          name='hello'
                          type='number'
                          label='%'
                          initial={this.state.goals.percentage.value}
                          onChange={this.handlePercentageChange('goals').bind(
                            this
                          )}
                        />
                      )}
                    </Grid>
                    <Grid item>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className={classes.arrow}
                      />
                    </Grid>
                    <Grid item>
                      {this.state.goals.points.display && (
                        <TextField
                          name='goals'
                          type='number'
                          label='Pts'
                          initial={this.state.goals.points.value}
                          onChange={this.handlePointsChange('goals').bind(this)}
                          required
                          validations='isTeamPointsValid'
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                            isTeamPointsValid: intl.formatMessage({
                              id: 'common.form.collaborator_points_valid',
                            }),
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <ProgressButton
                type='submit'
                text={intl.formatMessage({ id: 'common.submit' })}
                centered
                loading={loading}
              />
            </Grid>
          </Grid>
        </Formsy>
      </div>
    );
  }

  render() {
    const { intl } = this.props;
    const { configs, loading: configListLoading } = this.props.configList;
    const { success: configListUpdateSuccess } = this.props.configListUpdate;
    const loading = configListLoading;
    const success = configListUpdateSuccess;

    if (success) {
      this.props.configListUpdateActions.clearConfigListUpdate();
      toast.success(
        intl.formatMessage({ id: 'common.update_success_message' })
      );
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && configs && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({
  challengeTypeList,
  challengeTypeListUpdate,
  configList,
  configListUpdate,
}) => ({
  challengeTypeList,
  challengeTypeListUpdate,
  configList,
  configListUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  challengeTypeListActions: bindActionCreators(
    challengeTypeListActions,
    dispatch
  ),
  challengeTypeListUpdateActions: bindActionCreators(
    challengeTypeListUpdateActions,
    dispatch
  ),
  configListActions: bindActionCreators(configListActions, dispatch),
  configListUpdateActions: bindActionCreators(
    configListUpdateActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(TeamPointConfig)));
