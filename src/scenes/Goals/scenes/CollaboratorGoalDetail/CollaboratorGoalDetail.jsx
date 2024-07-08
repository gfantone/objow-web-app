import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { CollaboratorGoalList, SubHeader } from './components';
import {
  CollaboratorGoalRankList,
  GoalIndication,
  GoalJtiIndication,
} from '../../components';
import { MainLayoutComponent, Loader } from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import * as collaboratorGoalDetailActions from '../../../../services/CollaboratorGoals/CollaboratorGoalDetail/actions';
import * as collaboratorGoalRankListActions from '../../../../services/CollaboratorGoalRanks/CollaboratorGoalRankList/actions';
import _ from 'lodash';

class CollaboratorGoalDetail extends MainLayoutComponent {
  constructor(props) {
    super(props);
    const { account } = this.props.accountDetail;
    this.state = {
      page: account.hasGoalRankAccess ? 0 : 1,
      rankPage: 1,
      ranks: null,
      ranksLoaded: false,
    };
    this.rankLoader = React.createRef();
    this.observer = new IntersectionObserver(this.handleObserver);
  }

  handleObserver = () => {
    const id = this.props.match.params.id;
    const { ranks } = this.props.collaboratorGoalRankList;

    // load next page of ranks
    if (this.state.ranksLoaded && ranks && ranks.length > 0) {
      this.props.collaboratorGoalRankListActions.getCollaboratorGoalRankListByCollaboratorGoal(
        id,
        this.state.rankPage
      );
      this.setState({
        ...this.state,
        ranksLoaded: false,
      });
    }
  };

  handlePageChange(page) {
    this.setState({
      ...this.state,
      page: page,
    });
  }

  componentDidMount() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    const id = this.props.match.params.id;
    this.props.handleTitle(
      _.get(account, 'goalWording') ||
        intl.formatMessage({ id: 'admin.goal.title' })
    );
    this.props.handleSubHeader(
      <SubHeader
        onChange={this.handlePageChange.bind(this)}
        activateRank={account.hasGoalRankAccess}
      />
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.collaboratorGoalDetailActions.getCollaboratorGoalDetail(id);
    this.props.collaboratorGoalRankListActions.getCollaboratorGoalRankListByCollaboratorGoal(
      id
    );
  }

  componentDidUpdate() {
    const { account } = this.props.accountDetail;
    const { goal } = this.props.collaboratorGoalDetail;

    const { loading, ranks } = this.props.collaboratorGoalRankList;

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
              activateRank={account.hasGoalRankAccess && goal.allow_ranking}
            />
          );
        }
      );
    }
  }

  render() {
    const { account } = this.props.accountDetail;
    const { goal } = this.props.collaboratorGoalDetail;
    const { ranks } = this.state;
    const { loading } = this.props.collaboratorGoalRankList;
    const isJti = account.isJtiEnv;

    if (!account.hasGoalAccess) {
      return <Redirect to={'/challenges'} />;
    }
    return (
      <div>
        {account.hasGoalRankAccess &&
          this.state.page == 0 &&
          goal &&
          goal.allow_ranking &&
          ranks && (
            <>
              <CollaboratorGoalRankList
                goal={goal}
                ranks={ranks}
                collaboratorId={goal.collaboratorId}
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
          <GoalJtiIndication goal={goal} type='C' />
        ) : (
          this.state.page == 1 &&
          goal && <GoalIndication goal={goal} type='C' />
        )}

        {this.state.page == 2 && goal && <CollaboratorGoalList />}
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  collaboratorGoalDetail,
  collaboratorGoalRankList,
}) => ({
  accountDetail,
  collaboratorGoalDetail,
  collaboratorGoalRankList,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorGoalDetailActions: bindActionCreators(
    collaboratorGoalDetailActions,
    dispatch
  ),
  collaboratorGoalRankListActions: bindActionCreators(
    collaboratorGoalRankListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(CollaboratorGoalDetail));
