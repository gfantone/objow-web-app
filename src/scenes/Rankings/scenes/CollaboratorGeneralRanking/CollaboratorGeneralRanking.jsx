import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { PlayerRanking, RankingFilter } from '../../components';
import {
  AppBarSubTitle,
  EmptyState,
  Loader,
  MainLayoutComponent,
  IconButton,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import * as collaboratorListActions from '../../../../services/Collaborators/CollaboratorList/actions';
import * as collaboratorGeneralRankListActions from '../../../../services/CollaboratorGeneralRanks/CollaboratorGeneralRankList/actions';
import { Redirect } from 'react-router';

class CollaboratorGeneralRanking extends MainLayoutComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { intl } = this.props;
    this.props.activateReturn();
    this.props.handleTitle(intl.formatMessage({ id: 'ranking.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'ranking.collaborator_general_title' })}
      />
    );
    this.props.handleButtons(
      <IconButton size='small' onClick={this.handleFilterOpen.bind(this)}>
        <FontAwesomeIcon icon={faSlidersH} />
      </IconButton>
    );
    this.props.handleMaxWidth('md');
    this.props.collaboratorGeneralRankListActions.getCollaboratorGeneralRankList(
      this.props.match.params.period
    );
    this.props.collaboratorListActions.getCollaboratorList();
  }

  handleFilterOpen() {
    this.setState({
      ...this.state,
      filterOpen: true,
    });
  }

  handleFilterClose() {
    this.setState({
      ...this.state,
      filterOpen: false,
    });
  }

  refresh(team) {
    const { collaborator, period } = this.props.match.params;

    var url = `/rankings/collaborators/${collaborator}/general/${period}`;
    if (team) url += `?team=${team}`;
    this.props.history.replace(url);
  }

  handleFilterChange(team) {
    this.refresh(team);
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
    const { ranks } = this.props.collaboratorGeneralRankList;
    const { collaborators } = this.props.collaboratorList;
    // Filter by team
    const params = new URLSearchParams(window.location.search);
    const team = params.get('team');

    return (
      <PlayerRanking
        ranking={
          team
            ? ranks.filter(
                (rank) =>
                  _.get(
                    collaborators.find(
                      (c) => c.id === _.get(rank, 'collaboratorId')
                    ),
                    'team.id'
                  ) === parseInt(team)
              )
            : ranks
        }
        collaboratorId={this.props.match.params.collaborator}
      />
    );
  }

  render() {
    const { account } = this.props.accountDetail;
    const { ranks, loading: ranksLoading } =
      this.props.collaboratorGeneralRankList;
    const { collaborators, loading: collaboratorLoading } =
      this.props.collaboratorList;
    const loading = ranksLoading || collaboratorLoading;
    if (!account.hasRankingAccess) {
      return <Redirect to={`/`} />;
    }

    if (!account.hasGeneralRankAccess) {
      return <Redirect to='/' />;
    }

    // Filter by team
    const params = new URLSearchParams(window.location.search);
    const team = params.get('team');

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading &&
          collaborators &&
          ranks &&
          ranks.length > 0 &&
          this.renderData()}
        {!loading && ranks && ranks.length == 0 && this.renderEmptyState()}
        {this.state.filterOpen && (
          <RankingFilter
            open={this.state.filterOpen}
            onClose={this.handleFilterClose.bind(this)}
            onChange={this.handleFilterChange.bind(this)}
            team={team}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  collaboratorList,
  collaboratorGeneralRankList,
}) => ({
  accountDetail,
  collaboratorList,
  collaboratorGeneralRankList,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorListActions: bindActionCreators(
    collaboratorListActions,
    dispatch
  ),
  collaboratorGeneralRankListActions: bindActionCreators(
    collaboratorGeneralRankListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(CollaboratorGeneralRanking));
