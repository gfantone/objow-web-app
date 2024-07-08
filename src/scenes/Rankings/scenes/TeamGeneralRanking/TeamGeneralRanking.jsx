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
import { injectIntl } from 'react-intl';
import * as Resources from '../../../../Resources';
import * as teamGeneralRankListActions from '../../../../services/TeamGeneralRanks/TeamGeneralRankList/actions';
import { Redirect } from 'react-router';

class TeamGeneralRanking extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    this.props.activateReturn();
    this.props.handleTitle(intl.formatMessage({ id: 'ranking.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'ranking.team_general_title' })}
      />,
    );
    this.props.handleMaxWidth('md');
    this.props.teamGeneralRankListActions.getTeamGeneralRankList(
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
    const { ranking } = this.props.teamGeneralRankList;
    return (
      <TeamRanking ranking={ranking} teamId={this.props.match.params.team} />
    );
  }

  render() {
    const { account } = this.props.accountDetail;
    const { ranking, loading } = this.props.teamGeneralRankList;

    if (!account.hasRankingAccess) {
      return <Redirect to={`/`} />;
    }

    if (!account.hasGeneralRankAccess) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && ranking && ranking.length > 0 && this.renderData()}
        {!loading && ranking && ranking.length == 0 && this.renderEmptyState()}
      </div>
    );
  }
}

const mapStateToProps = ({ accountDetail, teamGeneralRankList }) => ({
  accountDetail,
  teamGeneralRankList,
});

const mapDispatchToProps = (dispatch) => ({
  teamGeneralRankListActions: bindActionCreators(
    teamGeneralRankListActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(TeamGeneralRanking));
