import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { PointSummary } from '../../../../components';
import {
  AdministratorCollaboratorSelector,
  DefaultTitle,
  Loader,
  TeamSelector,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';
import * as teamGlobalPointSummaryDetailActions from '../../../../../../services/TeamGlobalPointSummaries/TeamGlobalPointSummaryDetail/actions';
import * as teamRewardOrderCountActions from '../../../../../../services/TeamRewardOrders/TeamRewardOrderCount/actions';

const TeamRewardManagement = ({ periodId, accountDetail, ...props }) => {
  const intl = useIntl();
  const { summary, loading: teamGlobalPointSummaryDetailLoading } =
    props.teamGlobalPointSummaryDetail;
  const { orders, loading: teamRewardOrderCountLoading } =
    props.teamRewardOrderCount;
  const { account } = accountDetail;
  const loading = teamRewardOrderCountLoading;

  useEffect(() => {
    props.teamGlobalPointSummaryDetailActions.getTeamGlobalPointSummary(
      periodId
    );
    props.teamRewardOrderCountActions.countWaitingTeamRewardOrders();
  }, [periodId]);

  function handleTeamClick(teamId) {
    var url = `/rewards/teams/${teamId}`;
    if (periodId) url += `?period=${periodId}`;
    props.history.push(url);
  }
  function handleTrackingClick() {
    props.history.push('/rewards/tracking/teams');
  }

  function renderLoader() {
    return <Loader centered />;
  }

  function renderData() {
    const handleCollaboratorClick = (collaborator) => {
      const collaboratorUrl = `/rewards/collaborators/${collaborator.id}`;
      props.history.push(collaboratorUrl);
    };
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {teamGlobalPointSummaryDetailLoading && renderLoader()}
            {!teamGlobalPointSummaryDetailLoading && summary && (
              <PointSummary
                points={summary.points}
                usedPoints={summary.usedPoints}
                validatedValues={summary.validatedValues}
                waitingPoints={summary.waitingPoints}
                orders={orders}
                onTrackingClick={
                  account.role.code === 'A' ? handleTrackingClick : null
                }
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <AdministratorCollaboratorSelector
                  contextUrl='teams/'
                  contextUrlOptions={{ page: 1 }}
                  onClickCollaborator={handleCollaboratorClick}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div>
      {loading && renderLoader()}
      {!loading && orders != null && renderData()}
    </div>
  );
};
const mapStateToProps = ({
  teamGlobalPointSummaryDetail,
  teamRewardOrderCount,
  accountDetail,
}) => ({
  teamGlobalPointSummaryDetail,
  teamRewardOrderCount,
  accountDetail,
});

const mapDispatchToProps = (dispatch) => ({
  teamGlobalPointSummaryDetailActions: bindActionCreators(
    teamGlobalPointSummaryDetailActions,
    dispatch
  ),
  teamRewardOrderCountActions: bindActionCreators(
    teamRewardOrderCountActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TeamRewardManagement));
