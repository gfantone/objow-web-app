import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TeamRanking } from '../../components';
import {
  AppBarSubTitle,
  EmptyState,
  Loader,
  MainLayoutComponent,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as Resources from '../../../../Resources';
import * as teamChallengeGeneralRankListActions from '../../../../services/TeamChallengeGeneralRanks/TeamChallengeGeneralRankList/actions';
import { Redirect } from 'react-router';

class TeamChallengeRanking extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'ranking.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'ranking.team_challenge_title' })}
      />,
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.teamChallengeGeneralRankListActions.getTeamChallengeGeneralRankList(
      this.props.match.params.period,
    );
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderEmptyState() {
    const { intl } = this.props;
    return (
      <EmptyState
        title={intl.formatMessage({ id: 'ranking.empty_state_title' })}
      />
    );
  }

  renderData() {
    const { intl } = this.props;
    const { ranks } = this.props.teamChallengeGeneralRankList;
    return (
      <TeamRanking
        ranking={ranks}
        teamId={this.props.match.params.team}
        pointsLabel={intl.formatMessage({
          id: 'challenge.ranking.points_column',
        })}
      />
    );
  }

  render() {
    const { account } = this.props.accountDetail;
    const { ranks, loading } = this.props.teamChallengeGeneralRankList;

    if (!account.hasRankingAccess) {
      return <Redirect to={`/`} />;
    }

    if (!account.hasChallengeRankAccess) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && ranks && ranks.length > 0 && this.renderData()}
        {!loading && ranks && ranks.length == 0 && this.renderEmptyState()}
      </div>
    );
  }
}

const mapStateToProps = ({ accountDetail, teamChallengeGeneralRankList }) => ({
  accountDetail,
  teamChallengeGeneralRankList,
});

const mapDispatchToProps = (dispatch) => ({
  teamChallengeGeneralRankListActions: bindActionCreators(
    teamChallengeGeneralRankListActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(TeamChallengeRanking));
