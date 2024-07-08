import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RewardStore } from '..';
import { Loader } from '../../../../components';
import * as rewardListActions from '../../../../services/Rewards/RewardList/actions';
import * as teamPointSummaryDetailActions from '../../../../services/TeamPointSummaries/TeamPointSummaryDetail/actions';

const StoreTeamDepartment = ({ onAddClick, ...props }) => {
  const { rewards, loading: rewardListLoading } = props.rewardList;
  const { summary, loading: teamPointSummaryDetailLoading } =
    props.teamPointSummaryDetail;
  const teamRewards = rewards
    ? rewards.filter((x) => x.type.code === 'T')
    : null;
  const loading = rewardListLoading;

  function renderLoader() {
    return <Loader centered />;
  }
  function renderData() {
    return (
      <RewardStore
        rewards={teamRewards}
        summary={summary}
        loading={teamPointSummaryDetailLoading}
        onAddClick={onAddClick}
      />
    );
  }

  return (
    <div>
      {loading && renderLoader()}
      {!loading && teamRewards && renderData()}
    </div>
  );
};

const mapStateToProps = ({ rewardList, teamPointSummaryDetail }) => ({
  rewardList,
  teamPointSummaryDetail,
});

const mapDispatchToProps = (dispatch) => ({
  rewardListActions: bindActionCreators(rewardListActions, dispatch),
  teamPointSummaryDetailActions: bindActionCreators(
    teamPointSummaryDetailActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreTeamDepartment);
