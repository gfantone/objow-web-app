import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, isWidthUp, withWidth } from '@material-ui/core';
import { Chart } from './components';
import {
  Card,
  DefaultTitle,
  EmptyState,
  Loader,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';
import * as collaboratorGoalSummaryListActions from '../../../../../../services/CollaboratorGoalSummaries/CollaboratorGoalSummaryList/actions';
import * as teamCollaboratorGoalListActions from '../../../../../../services/TeamCollaboratorGoals/TeamCollaboratorGoalList/actions';
import * as teamGoalSummaryListActions from '../../../../../../services/TeamGoalSummaries/TeamGoalSummaryList/actions';

const StatsData = ({
  collaborator,
  definition,
  display,
  period,
  team,
  ...props
}) => {
  const intl = useIntl();
  const {
    goals: collaboratorGoalSummaryListGoals,
    loading: collaboratorGoalSummaryListLoading,
  } = props.collaboratorGoalSummaryList;
  const { period: currentPeriod } = props.currentPeriodDetail;
  const { definitions } = props.goalDefinitionList;
  const { periods: previousPeriods } = props.previousPeriodList;
  const {
    goals: teamCollaboratorGoalListGoals,
    loading: teamCollaboratorGoalListLoading,
  } = props.teamCollaboratorGoalList;
  const {
    goals: teamGoalSummaryListGoals,
    loading: teamGoalSummaryListLoading,
  } = props.teamGoalSummaryList;
  const goals = collaboratorGoalSummaryListGoals
    ? collaboratorGoalSummaryListGoals
    : teamCollaboratorGoalListGoals
    ? teamCollaboratorGoalListGoals
    : teamGoalSummaryListGoals
    ? teamGoalSummaryListGoals
    : [];
  const loading =
    collaboratorGoalSummaryListLoading ||
    teamCollaboratorGoalListLoading ||
    teamGoalSummaryListLoading;
  const periods =
    currentPeriod && previousPeriods
      ? [currentPeriod].concat(previousPeriods)
      : null;
  const periodObject =
    period && periods ? periods.find((x) => x.id === period) : null;
  const periodStart = periodObject
    ? '{0}-{1}-{2}'.format(
        periodObject.start.toDate2().getFullYear(),
        periodObject.start.toDate2().getMonth() + 1,
        periodObject.start.toDate2().getDate()
      )
    : null;
  const periodEnd = periodObject
    ? '{0}-{1}-{2}'.format(
        periodObject.end.toDate2().getFullYear(),
        periodObject.end.toDate2().getMonth() + 1,
        periodObject.end.toDate2().getDate()
      )
    : null;
  const pointData = goals.map((x) => ({
    color: x.color,
    counter: x.counter,
    maxPoints: x.maxPoints,
    points: x.points,
    target: x.target,
    typeCode: x.type,
    x: '{0}-{1}-{2}'.format(
      x.end.toDate2().getFullYear(),
      x.end.toDate2().getMonth() + 1,
      x.end.toDate2().getUTCDate()
    ),
    y: Math.round((x.counter / x.target) * 100),
  }));
  const data = [
    {
      id: 'goal',
      color: '#00E58D',
      data: pointData,
    },
  ];

  useEffect(() => {
    const definitionObjects =
      definition && definitions
        ? definitions.filter((x) => x.id === definition)
        : null;
    const definitionObject =
      definitionObjects && definitionObjects.length === 1
        ? definitionObjects[0]
        : null;

    if (collaborator && definitionObject && definitionObject.typeCode === 'C') {
      props.collaboratorGoalSummaryListActions.getCollaboratorGoalSummaryListByDefinitionAndCollaborator(
        definition,
        collaborator
      );
      props.teamCollaboratorGoalListActions.clearTeamCollaboratorGoalList();
      props.teamGoalSummaryListActions.clearTeamGoalSummaryList();
    } else if (
      collaborator &&
      definitionObject &&
      definitionObject.typeCode === 'T'
    ) {
      props.teamGoalSummaryListActions.getTeamGoalSummaryListByDefinitionAndCollaborator(
        definition,
        collaborator
      );
      props.collaboratorGoalSummaryListActions.clearCollaboratorGoalSummaryList();
      props.teamCollaboratorGoalListActions.clearTeamCollaboratorGoalList();
    } else if (team && definitionObject && definitionObject.typeCode === 'C') {
      props.teamCollaboratorGoalListActions.getTeamCollaboratorGoalListByDefinitionAndTeam(
        definition,
        team
      );
      props.collaboratorGoalSummaryListActions.clearCollaboratorGoalSummaryList();
      props.teamGoalSummaryListActions.clearTeamGoalSummaryList();
    } else if (team && definitionObject && definitionObject.typeCode === 'T') {
      props.teamGoalSummaryListActions.getTeamGoalSummaryListByDefinitionAndTeam(
        definition,
        team
      );
      props.collaboratorGoalSummaryListActions.clearCollaboratorGoalSummaryList();
      props.teamCollaboratorGoalListActions.clearTeamCollaboratorGoalList();
    } else {
      props.collaboratorGoalSummaryListActions.clearCollaboratorGoalSummaryList();
      props.teamCollaboratorGoalListActions.clearTeamCollaboratorGoalList();
      props.teamGoalSummaryListActions.clearTeamGoalSummaryList();
    }
  }, [collaborator, definition, definitions, team]);

  function renderData() {
    const containerStyle = isWidthUp('sm', props.width)
      ? null
      : { overflowY: 'hidden' };
    const chartStyle = isWidthUp('sm', props.width)
      ? { height: 600 }
      : { height: 400, width: 600 };

    return (
      <Card>
        <div style={containerStyle}>
          <div style={chartStyle}>
            <Chart data={data} end={periodEnd} start={periodStart} />
          </div>
        </div>
      </Card>
    );
  }

  function renderEmptyState() {
    return (
      <EmptyState
        title={intl.formatMessage({ id: 'statistics.empty_state_title' })}
        message={intl.formatMessage({ id: 'statistics.empty_state_message' })}
      />
    );
  }

  function renderLoader() {
    return <Loader centered />;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DefaultTitle isContrast>
          {intl.formatMessage({ id: 'login.description_line3' })}
        </DefaultTitle>
      </Grid>
      <Grid item xs={12}>
        {display && !loading && goals && goals.length > 0 && renderData()}
        {display &&
          !loading &&
          goals &&
          goals.length === 0 &&
          renderEmptyState()}
        {display && loading && renderLoader()}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({
  collaboratorGoalSummaryList,
  currentPeriodDetail,
  goalDefinitionList,
  previousPeriodList,
  teamCollaboratorGoalList,
  teamGoalSummaryList,
}) => ({
  collaboratorGoalSummaryList,
  currentPeriodDetail,
  goalDefinitionList,
  previousPeriodList,
  teamCollaboratorGoalList,
  teamGoalSummaryList,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorGoalSummaryListActions: bindActionCreators(
    collaboratorGoalSummaryListActions,
    dispatch
  ),
  teamCollaboratorGoalListActions: bindActionCreators(
    teamCollaboratorGoalListActions,
    dispatch
  ),
  teamGoalSummaryListActions: bindActionCreators(
    teamGoalSummaryListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(StatsData));
