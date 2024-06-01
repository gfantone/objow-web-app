import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { GoalTypeSwitch } from './components';
import { Button, DatePicker, Select } from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import '../../../../helpers/StringHelper';
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions';
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

class GoalFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
      team: props.team,
      collaborator: props.collaborator,
      year: props.year,
      start: props.end,
      end: props.end,
      onlyCollaborator: props.onlyCollaborator,
      onlyTeam: props.onlyTeam,
    };
  }

  componentDidMount() {
    this.props.categoryListActions.getActiveCategoryList();
    // this.props.teamListActions.getTeamList();
    this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
    this.props.previousPeriodListActions.getPreviousPeriodList();
  }

  componentWillReceiveProps(props) {
    if (
      props.category != this.state.category ||
      props.team != this.state.team ||
      (props.collaborator != this.state.collaborator) |
        (props.year != this.state.year) ||
      props.start != this.state.start ||
      props.end != this.state.end ||
      props.onlyCollaborator != this.state.onlyCollaborator ||
      props.onlyTeam != this.state.onlyTeam
    ) {
      this.setState({
        ...this.state,
        category: props.category,
        team: props.team,
        collaborator: props.collaborator,
        year: props.year,
        start: props.start,
        end: props.end,
        onlyCollaborator: props.onlyCollaborator,
        onlyTeam: props.onlyTeam,
      });
    }
  }

  handleChange = (name) => (value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleSubmit(model) {
    const category =
      model.category != null && model.category != -1
        ? Number(model.category)
        : null;
    const team = this.props.team;
    const collaborator = this.props.collaborator;
    var start = model.start;
    var end = model.end;
    if (start) {
      start.setHours(0, 0, 0, 0);
    }
    if (end) {
      end.setHours(23, 59, 59);
    }
    const onlyCollaborator = Boolean(model.onlyCollaborator);
    const onlyTeam = Boolean(model.onlyTeam);
    this.props.onChange(
      category,
      team,
      collaborator,
      model.year,
      start,
      end,
      onlyCollaborator,
      onlyTeam,
    );
    this.props.onClose();
  }

  renderData() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    const { categories } = this.props.categoryList;
    const { period: currentPeriod } = this.props.currentPeriodDetail;
    const { periods: previousPeriods } = this.props.previousPeriodList;
    const { teams } = this.props.teamList;
    const selectedTeam = this.state.team
      ? teams.filter((team) => team.id == this.state.team)[0]
      : null;
    const collaborators = selectedTeam ? selectedTeam.collaborators : null;
    const periods = [currentPeriod].concat(previousPeriods);

    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.onClose}>
          <Formsy onSubmit={this.handleSubmit.bind(this)}>
            <DialogTitle>
              {intl.formatMessage({ id: 'filter.title' })}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <GoalTypeSwitch
                        icon={faUser}
                        initial={this.state.onlyCollaborator}
                        label={intl.formatMessage({
                          id: 'admin.goal.thumbnail.collaborator_tag',
                        })}
                        name="onlyCollaborator"
                      />
                    </Grid>
                    <Grid item>
                      <GoalTypeSwitch
                        icon={faUsers}
                        initial={this.state.onlyTeam}
                        label={intl.formatMessage({
                          id: 'admin.goal.thumbnail.team_tag',
                        })}
                        name="onlyTeam"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Select
                    name={'year'}
                    label={intl.formatMessage({ id: 'filter.period_label' })}
                    options={periods}
                    optionValueName={'id'}
                    optionTextName={'name'}
                    fullWidth
                    emptyDisabled={true}
                    initial={
                      this.state.year ? this.state.year : currentPeriod.id
                    }
                    onChange={this.handleChange('year').bind(this)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    name="start"
                    label={intl.formatMessage({ id: 'filter.start_label' })}
                    initial={this.state.start}
                    format="dd/MM/yyyy"
                    fullWidth
                    clearable
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    name="end"
                    label={intl.formatMessage({ id: 'filter.end_label' })}
                    initial={this.state.end}
                    format="dd/MM/yyyy"
                    fullWidth
                    clearable
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClose} color="secondary">
                {intl.formatMessage({ id: 'common.cancel' })}
              </Button>
              <Button type="submit">
                {intl.formatMessage({ id: 'filter.submit_button' })}
              </Button>
            </DialogActions>
          </Formsy>
        </Dialog>
      </div>
    );
  }

  render() {
    const { account } = this.props.accountDetail;
    const { categories } = this.props.categoryList;
    const { period: currentPeriod } = this.props.currentPeriodDetail;
    const { periods: previousPeriods } = this.props.previousPeriodList;
    const { teams } = this.props.teamList;

    return (
      <div>
        {account &&
          categories &&
          currentPeriod &&
          previousPeriods &&
          teams &&
          this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  categoryList,
  teamList,
  currentPeriodDetail,
  previousPeriodList,
}) => ({
  accountDetail,
  categoryList,
  teamList,
  currentPeriodDetail,
  previousPeriodList,
});

const mapDispatchToProps = (dispatch) => ({
  categoryListActions: bindActionCreators(categoryListActions, dispatch),
  teamListActions: bindActionCreators(teamListActions, dispatch),
  currentPeriodDetailActions: bindActionCreators(
    currentPeriodDetailActions,
    dispatch,
  ),
  previousPeriodListActions: bindActionCreators(
    previousPeriodListActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(GoalFilter));
