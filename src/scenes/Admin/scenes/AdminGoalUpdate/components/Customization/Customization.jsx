import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  Filters,
  TeamCollaboratorGoalList,
  TeamGoalList,
  CollaboratorGoalList,
  GoalList,
  GoalSpreadsheet,
} from './components';
import {
  DefaultTitle,
  EmptyState,
  Loader,
  NavigationSwitch,
} from '../../../../../../components';
import * as Formsy from 'formsy-react';
import * as teamListActions from '../../../../../../services/Teams/TeamList/actions';
import { bindActionCreators } from 'redux';
import { faTable, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { injectIntl } from 'react-intl';
import _ from 'lodash';

const styles = {
  title: {
    marginBottom: 16,
  },
  filters: {
    marginBottom: 32,
  },
  linkWrapper: {
    marginBottom: 10,
  },
  link: {
    fontSize: 20,
    cursor: 'pointer',
    '&:hover, &.active': {
      color: 'rgb(15,111,222)',
      opacity: 1,
    },
    '&.disabled': {
      color: '#ccc',
    },
  },
};
class Customization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      team: null,
      page: 1,
      defaultTeam: false,
      filterLoading: false,
    };
    this.switch = React.createRef();
  }

  componentDidMount() {
    this.props.teamListActions.getTeamList({ simpleCollaborators: true });
  }

  setDefaultTeam() {
    const { teams } = this.props.teamList;

    this.setState({
      ...this.state,
      team: _.get(teams, '[0].id'),
      defaultTeam: true,
    });
  }

  handleChange = (name) => (value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  renderLoader() {
    return <Loader centered />;
  }

  setFilterLoading = (value) => {
    this.setState({
      ...this.state,
      filterLoading: value,
    });
  };

  renderData() {
    const { intl } = this.props;
    const { definition } = this.props.goalDefinitionDetail;
    const { teams, loading } = this.props.teamList;
    const now = new Date();
    const date =
      definition.periodicity.code != 'Y'
        ? this.state.date
        : new Date(Date.UTC(now.getFullYear(), 0, 1));
    const isSpreadSheet = this.state.page === 2;

    if (
      this.state.page === 2 &&
      !this.state.defaultTeam &&
      definition.type.code == 'C'
    ) {
      this.setDefaultTeam();
    }
    const disableSwitch = loading && definition.type.code == 'C';
    // console.log(this.state)
    return (
      <div>
        <Grid container justify='flex-end' spacing={1}>
          <Grid item>
            <Grid
              container
              alignItems='center'
              spacing={1}
              className={this.props.classes.linkWrapper}
            >
              <Grid
                item
                onClick={() => !disableSwitch && this.handleChange('page')(1)}
                className={`${this.props.classes.link} ${
                  !isSpreadSheet ? 'active' : ''
                } ${disableSwitch ? 'disabled' : ''}`}
              >
                {intl.formatMessage({ id: 'admin.goal.classic_title' })}
              </Grid>
              <Grid item>
                <NavigationSwitch
                  onChange={(event) => {
                    this.handleChange('page')(event.target.checked ? 2 : 1);
                  }}
                  defaultChecked={false}
                  color='default'
                  ref={this.switch}
                  checked={isSpreadSheet}
                  inputProps={{ 'aria-label': 'checkbox with default color' }}
                  disabled={disableSwitch}
                />
              </Grid>
              <Grid
                item
                onClick={() => !disableSwitch && this.handleChange('page')(2)}
                className={`${this.props.classes.link} ${
                  isSpreadSheet ? 'active' : ''
                } ${disableSwitch ? 'disabled' : ''}`}
              >
                {intl.formatMessage({ id: 'admin.goal.spreadsheet_title' })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ zIndex: 1 }}>
          {(definition.type.code == 'C' ||
            definition.periodicity.code != 'Y') &&
            (definition.type.code !== 'T' || this.state.page !== 2) && (
              <Grid item container spacing={1}>
                <Grid item xs={12} style={{ zIndex: 1 }}>
                  <DefaultTitle>
                    {intl.formatMessage({ id: 'filter.title' })}
                  </DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                  <Filters
                    loading={this.state.filterLoading || loading}
                    defaultDate={this.state.date}
                    displayDateFilter={this.state.page !== 2}
                    onDateChange={this.handleChange('date').bind(this)}
                    onTeamChange={this.handleChange('team').bind(this)}
                    defaultTeam={this.state.team}
                    kpi={definition.kpi}
                  />
                </Grid>
              </Grid>
            )}
          {this.state.page === 1 && (
            <Grid item xs={12}>
              {!date && (!this.state.team || definition.type.code == 'T') && (
                <GoalList />
              )}
              {definition.type.code == 'T' && date && (
                <TeamGoalList date={date} />
              )}
              {definition.type.code == 'C' && date && !this.state.team && (
                <TeamCollaboratorGoalList date={date} />
              )}
              {definition.type.code == 'C' && date && this.state.team && (
                <CollaboratorGoalList date={date} team={this.state.team} />
              )}
              {!date && definition.type.code == 'C' && this.state.team && (
                <EmptyState
                  title='Aucun période sélectionnée'
                  message='Veuillez renseigner une période pour afficher des objectifs'
                />
              )}
            </Grid>
          )}
        </Grid>
        {this.state.page === 2 && (
          <GoalSpreadsheet
            team={this.state.team}
            setFilterLoading={this.setFilterLoading}
            filterLoading={this.state.filterLoading}
          />
        )}
      </div>
    );
  }

  render() {
    const { teams, loading } = this.props.teamList;
    return <div>{this.renderData()}</div>;
  }
}

const mapStateToProps = ({ goalDefinitionDetail, teamList }) => ({
  goalDefinitionDetail,
  teamList,
});

const mapDispatchToProps = (dispatch) => ({
  teamListActions: bindActionCreators(teamListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(Customization)));
