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
import { Button, Select } from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions';
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions';

class CategoryFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: props.team,
      collaborator: props.collaborator,
      year: props.year,
    };
  }

  componentDidMount() {
    this.props.teamListActions.getTeamList();
    this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
    this.props.previousPeriodListActions.getPreviousPeriodList();
  }

  componentWillReceiveProps(props) {
    if (
      props.team != this.state.team ||
      (props.collaborator != this.state.collaborator) |
        (props.year != this.state.year)
    ) {
      this.setState({
        ...this.state,
        team: props.team,
        collaborator: props.collaborator,
        year: props.year,
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
    const team =
      model.team != null && model.team != -1 && model.team != undefined
        ? Number(model.team)
        : null;
    const collaborator =
      model.collaborator != null &&
      model.collaborator != -1 &&
      model.collaborator != undefined
        ? Number(model.collaborator)
        : null;
    this.props.onChange(team, collaborator, model.year);
    this.props.onClose();
  }

  renderData() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    const { period: currentPeriod } = this.props.currentPeriodDetail;
    const { periods: previousPeriods } = this.props.previousPeriodList;
    const teams = this.props.teamList.teams.filter((team) => !team.custom);
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
                {(account.role.code === 'A' || account.role.code == 'S') && (
                  <Grid item xs={12}>
                    <Select
                      name="team"
                      label={intl.formatMessage({ id: 'filter.team_label' })}
                      options={teams}
                      optionValueName="id"
                      optionTextName="name"
                      fullWidth
                      initial={this.state.team}
                      onChange={this.handleChange('team').bind(this)}
                      emptyDisabled
                    />
                  </Grid>
                )}
                {account.role.code !== 'C' && collaborators && (
                  <Grid item xs={12}>
                    <Select
                      name="collaborator"
                      label={intl.formatMessage({
                        id: 'filter.collaborator_label',
                      })}
                      options={collaborators}
                      emptyText={intl.formatMessage({
                        id: 'filter.collaborator_all_option',
                      })}
                      optionValueName="id"
                      optionTextName="fullname"
                      fullWidth
                      initial={this.state.collaborator}
                      onChange={this.handleChange('collaborator').bind(this)}
                    />
                  </Grid>
                )}
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
    const { period: currentPeriod } = this.props.currentPeriodDetail;
    const { periods: previousPeriods } = this.props.previousPeriodList;
    const { teams } = this.props.teamList;

    return (
      <div>
        {account &&
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
  teamList,
  currentPeriodDetail,
  previousPeriodList,
}) => ({
  accountDetail,
  teamList,
  currentPeriodDetail,
  previousPeriodList,
});

const mapDispatchToProps = (dispatch) => ({
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
)(injectIntl(CategoryFilter));
