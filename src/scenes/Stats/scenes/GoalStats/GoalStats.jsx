import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { StatsData, StatsFilter } from './components';
import { MainLayoutComponent } from '../../../../components';
import * as collaboratorGoalSummaryListActions from '../../../../services/CollaboratorGoalSummaries/CollaboratorGoalSummaryList/actions';
import * as teamCollaboratorGoalListActions from '../../../../services/TeamCollaboratorGoals/TeamCollaboratorGoalList/actions';
import * as teamGoalSummaryListActions from '../../../../services/TeamGoalSummaries/TeamGoalSummaryList/actions';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';

class GoalStats extends MainLayoutComponent {
  state = {
    collaborator: null,
    definition: null,
    filterRequiredLoaded: false,
    period: null,
    team: null,
  };

  constructor(props) {
    super(props);
    this.category = null;
    this.collaborator = null;
    this.period = null;
    this.team = null;
  }

  componentDidMount() {
    const { intl } = this.props;
    const params = new URLSearchParams(window.location.search);
    const categoryIdParam = params.get('category');
    const collaboratorIdParam = params.get('collaborator');
    const periodIdParam = params.get('period');
    const teamIdParam = params.get('team');
    this.category = categoryIdParam ? Number(categoryIdParam) : null;
    this.collaborator = collaboratorIdParam
      ? Number(collaboratorIdParam)
      : null;
    this.period = periodIdParam ? Number(periodIdParam) : null;
    this.team = teamIdParam ? Number(teamIdParam) : null;
    this.props.handleTitle(intl.formatMessage({ id: 'statistics.title' }));
    this.props.activateReturn();
  }

  handleFilterChange(collaborator, definition, period, team) {
    this.setState({
      ...this.state,
      collaborator: collaborator,
      definition: definition,
      period: period,
      team: team,
    });
  }

  handleFilterRequiredLoaded(loaded) {
    this.setState({
      ...this.state,
      filterRequiredLoaded: loaded,
    });
  }

  render() {
    const { account } = this.props.accountDetail;

    if (!account.hasStatisticsAccess) {
      return <Redirect to={'/'} />;
    }

    return (
      <Grid container spacing={4}>
        {this.category && this.period && (this.collaborator || this.team) && (
          <Grid item xs={12}>
            <StatsFilter
              initialCategory={this.category}
              initialCollaborator={this.collaborator}
              initialPeriod={this.period}
              initialTeam={this.team}
              onChange={this.handleFilterChange.bind(this)}
              onFilterRequiredLoaded={this.handleFilterRequiredLoaded.bind(
                this,
              )}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <StatsData
            collaborator={this.state.collaborator}
            definition={this.state.definition}
            display={this.state.filterRequiredLoaded}
            period={this.state.period}
            team={this.state.team}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  collaboratorGoalCategoryList,
  collaboratorGoalSummaryList,
  currentPeriodDetail,
  goalDefinitionList,
  previousPeriodList,
  teamCollaboratorGoalList,
  teamGoalCategoryList,
  teamGoalSummaryList,
  teamList,
}) => ({
  accountDetail,
  collaboratorGoalCategoryList,
  collaboratorGoalSummaryList,
  currentPeriodDetail,
  goalDefinitionList,
  previousPeriodList,
  teamCollaboratorGoalList,
  teamGoalCategoryList,
  teamGoalSummaryList,
  teamList,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorGoalSummaryListActions: bindActionCreators(
    collaboratorGoalSummaryListActions,
    dispatch,
  ),
  teamCollaboratorGoalListActions: bindActionCreators(
    teamCollaboratorGoalListActions,
    dispatch,
  ),
  teamGoalSummaryListActions: bindActionCreators(
    teamGoalSummaryListActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(GoalStats)));
