import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { TeamGoalList, SubHeader } from './components';
import {
  GoalIndication,
  GoalJtiIndication,
  TeamGoalRankList,
} from '../../components';
import { MainLayoutComponent, Loader } from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import * as teamGoalDetailActions from '../../../../services/TeamGoals/TeamGoalDetail/actions';
import * as teamGoalRankListActions from '../../../../services/TeamGoalRanks/TeamGoalRankList/actions';
import _ from 'lodash';

class TeamGoalDetail extends MainLayoutComponent {
  constructor(props) {
    super(props);
    const { account } = this.props.accountDetail;
    this.state = {
      page: account.hasGoalRankAccess && account.hasTeamRankAccess ? 0 : 1,
      rankPage: 1,
      ranks: null,
      ranksLoaded: false,
    };
    this.rankLoader = React.createRef();
    this.observer = new IntersectionObserver(this.handleObserver);
  }
  handleObserver = () => {
    const id = this.props.match.params.id;
    const { ranks } = this.props.teamGoalRankList;

    // load next page of ranks
    if (this.state.ranksLoaded && ranks && ranks.length > 0) {
      this.props.teamGoalRankListActions.getTeamGoalRankList(
        id,
        this.state.rankPage
      );
      this.setState({
        ...this.state,
        ranksLoaded: false,
      });
    }
  };

  handlePageChange = (page) => {
    this.setState({
      ...this.state,
      page: page,
    });
  };

  componentDidMount() {
    const { intl } = this.props;
    const id = this.props.match.params.id;
    const { account } = this.props.accountDetail;
    this.props.handleTitle(
      _.get(account, 'goalWording') ||
        intl.formatMessage({ id: 'admin.goal.title' })
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.teamGoalDetailActions.getTeamGoalDetail(id);
    this.props.teamGoalRankListActions.getTeamGoalRankList(id);
    this.props.handleSubHeader(
      <SubHeader
        onChange={this.handlePageChange.bind(this)}
        activateRank={account.hasGoalRankAccess && account.hasTeamRankAccess}
      />
    );
  }

  componentDidUpdate() {
    const { account } = this.props.accountDetail;
    const { goal } = this.props.teamGoalDetail;
    const { loading, ranks } = this.props.teamGoalRankList;

    if (ranks && !loading && !this.state.ranksLoaded) {
      this.setState({
        ...this.state,
        ranksLoaded: true,
        rankPage: this.state.rankPage + 1,
        ranks: [...(this.state.ranks ? this.state.ranks : []), ...ranks],
      });
    }
    if (this.rankLoader.current) this.observer.observe(this.rankLoader.current);

    if (!this.state.initialized && goal && account) {
      this.setState(
        {
          ...this.state,
          initialized: true,
          page:
            this.state.page === 0 && !goal.allow_ranking ? 1 : this.state.page,
        },
        () => {
          this.props.handleSubHeader(
            <SubHeader
              onChange={this.handlePageChange.bind(this)}
              activateRank={
                account.hasGoalRankAccess &&
                account.hasTeamRankAccess &&
                goal.allow_ranking
              }
            />
          );
        }
      );
    }
  }

  render() {
    const { account } = this.props.accountDetail;
    const { goal } = this.props.teamGoalDetail;
    const { ranks } = this.state;
    const { loading } = this.props.teamGoalRankList;
    const isJti = account.isJtiEnv;

    if (!account.hasGoalAccess) {
      return <Redirect to={'/challenges'} />;
    }

    return (
      <div>
        {account.hasGoalRankAccess &&
          account.hasTeamRankAccess &&
          this.state.page == 0 &&
          goal &&
          ranks &&
          goal.allow_ranking && (
            <>
              <TeamGoalRankList
                goal={goal}
                ranks={ranks}
                teamId={goal.teamId}
                account={account}
              />
              <div
                ref={this.rankLoader}
                style={{ width: '100%', height: 1, marginTop: 0 }}
              />
              {loading && (
                <div style={{ marginTop: 10, marginBottom: 40, zIndex: 1 }}>
                  <Loader centered />
                </div>
              )}
            </>
          )}
        {isJti && this.state.page == 1 && goal ? (
          <GoalJtiIndication goal={goal} type='T' />
        ) : (
          this.state.page == 1 &&
          goal && <GoalIndication goal={goal} type='T' />
        )}

        {this.state.page == 2 && goal && <TeamGoalList />}
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  teamGoalDetail,
  teamGoalRankList,
}) => ({
  accountDetail,
  teamGoalDetail,
  teamGoalRankList,
});

const mapDispatchToProps = (dispatch) => ({
  teamGoalDetailActions: bindActionCreators(teamGoalDetailActions, dispatch),
  teamGoalRankListActions: bindActionCreators(
    teamGoalRankListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TeamGoalDetail));
