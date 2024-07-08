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
import * as teamCollaboratorGoalDetailActions from '../../../../services/TeamCollaboratorGoals/TeamCollaboratorGoalDetail/actions';
import * as collaboratorGoalRankListActions from '../../../../services/CollaboratorGoalRanks/CollaboratorGoalRankList/actions';
import * as goalDefinitionPointRepartitionListActions from '../../../../services/GoalDefinitionPointRepartitions/GoalDefinitionPointRepartitionList/actions';
import * as goalDefinitionPointRepartitionModeListActions from '../../../../services/GoalDefinitionPointRepartitionModes/GoalDefinitionPointRepartitionModeList/actions';
import _ from 'lodash';

class TeamCollaboratorGoalDetail extends MainLayoutComponent {
  constructor(props) {
    super(props);
    const { account } = this.props.accountDetail;
    this.state = {
      page: account.hasGoalRankAccess ? 0 : 1,
      rankPage: 1,
      ranks: null,
      ranksLoaded: false,
      initialized: false,
    };
    this.rankLoader = React.createRef();
    this.observer = new IntersectionObserver(this.handleObserver);
  }
  // infinite scroll
  handleObserver = () => {
    const { loading, ranks } = this.props.collaboratorGoalRankList;
    const id = this.props.match.params.id;

    // load next page of ranks
    if (this.state.ranksLoaded && ranks && ranks.length > 0) {
      this.props.collaboratorGoalRankListActions.getCollaboratorGoalRankListByTeamCollaboratorGoal(
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
    this.props.teamCollaboratorGoalDetailActions.getTeamCollaboratorGoalDetail(
      id
    );
    this.props.collaboratorGoalRankListActions.getCollaboratorGoalRankListByTeamCollaboratorGoal(
      id
    );
    this.props.goalDefinitionPointRepartitionListActions.getGoalDefinitionPointRepartitionList();
    this.props.goalDefinitionPointRepartitionModeListActions.getGoalDefinitionPointRepartitionModeList();
  }
  componentDidUpdate() {
    const { account } = this.props.accountDetail;
    const { goal } = this.props.teamCollaboratorGoalDetail;
    const id = this.props.match.params.id;
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
    const { goal } = this.props.teamCollaboratorGoalDetail;
    const { ranks } = this.state;
    const { teams } = this.props.teamList;
    const { loading } = this.props.collaboratorGoalRankList;
    const isJti = account.isJtiEnv;

    let customRepartitions = [];
    const currentTeam =
      teams &&
      goal &&
      goal.teamId &&
      teams.find((team) => team.id === goal.teamId);

    const {
      pointRepartitions,
      loading: goalDefinitionPointRepartitionLoading,
    } = this.props.goalDefinitionPointRepartitionList;

    const { modes: repartitionModes } =
      this.props.goalDefinitionPointRepartitionModeList;

    if (currentTeam && pointRepartitions && repartitionModes) {
      const individualMode =
        repartitionModes && repartitionModes.find((mode) => mode.code === 'I');
      customRepartitions =
        pointRepartitions && individualMode && currentTeam
          ? pointRepartitions.filter(
              (repartition) =>
                repartition.definition === goal.definition.id &&
                _.get(currentTeam, 'collaborators', [])
                  .map((c) => c.id)
                  .indexOf(repartition.collaborator) >= 0 &&
                repartition.mode === individualMode.id
            )
          : [];
    }

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
                account={account}
                ranks={ranks}
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
          <GoalJtiIndication
            goal={goal}
            type='TC'
            customRepartitions={customRepartitions.map((repartition) => ({
              collaborator: currentTeam.collaborators.find(
                (c) => c.id === repartition.collaborator
              ),
            }))}
          />
        ) : (
          this.state.page == 1 &&
          goal && (
            <GoalIndication
              goal={goal}
              type='TC'
              customRepartitions={customRepartitions.map((repartition) => ({
                collaborator: currentTeam.collaborators.find(
                  (c) => c.id === repartition.collaborator
                ),
              }))}
            />
          )
        )}

        {this.state.page == 2 && goal && <CollaboratorGoalList />}
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  collaboratorGoalRankList,
  teamCollaboratorGoalDetail,
  goalDefinitionPointRepartitionList,
  goalDefinitionPointRepartitionModeList,
  teamList,
}) => ({
  accountDetail,
  collaboratorGoalRankList,
  teamCollaboratorGoalDetail,
  teamList,
  goalDefinitionPointRepartitionList,
  goalDefinitionPointRepartitionModeList,
});

const mapDispatchToProps = (dispatch) => ({
  teamCollaboratorGoalDetailActions: bindActionCreators(
    teamCollaboratorGoalDetailActions,
    dispatch
  ),
  collaboratorGoalRankListActions: bindActionCreators(
    collaboratorGoalRankListActions,
    dispatch
  ),
  goalDefinitionPointRepartitionListActions: bindActionCreators(
    goalDefinitionPointRepartitionListActions,
    dispatch
  ),
  goalDefinitionPointRepartitionModeListActions: bindActionCreators(
    goalDefinitionPointRepartitionModeListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TeamCollaboratorGoalDetail));
