import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { CollaboratorGoalList, SubHeader } from './components'
import { CollaboratorGoalRankList, GoalIndication } from '../../components'
import { MainLayoutComponent } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamCollaboratorGoalDetailActions from '../../../../services/TeamCollaboratorGoals/TeamCollaboratorGoalDetail/actions'
import * as collaboratorGoalRankListActions from '../../../../services/CollaboratorGoalRanks/CollaboratorGoalRankList/actions'
import * as goalDefinitionPointRepartitionListActions from '../../../../services/GoalDefinitionPointRepartitions/GoalDefinitionPointRepartitionList/actions'
import * as goalDefinitionPointRepartitionModeListActions from '../../../../services/GoalDefinitionPointRepartitionModes/GoalDefinitionPointRepartitionModeList/actions'


class TeamCollaboratorGoalDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        const { account } = this.props.accountDetail;
        this.state = {
            page: account.hasGoalRankAccess ? 0 : 1,
            initialized: false
        }
    }

    handlePageChange(page) {
        this.setState({
            ...this.state,
            page: page
        })
    }

    componentDidMount() {
        const { account } = this.props.accountDetail;
        const id = this.props.match.params.id;
        this.props.handleTitle(Resources.GOAL_LONG_TITLE);
        this.props.handleSubHeader(<SubHeader onChange={this.handlePageChange.bind(this)} activateRank={account.hasGoalRankAccess} />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.teamCollaboratorGoalDetailActions.getTeamCollaboratorGoalDetail(id);
        this.props.collaboratorGoalRankListActions.getCollaboratorGoalRankListByTeamCollaboratorGoal(id)
        this.props.goalDefinitionPointRepartitionListActions.getGoalDefinitionPointRepartitionList()
        this.props.goalDefinitionPointRepartitionModeListActions.getGoalDefinitionPointRepartitionModeList()
    }
    componentDidUpdate() {
      const { account } = this.props.accountDetail;
      const { goal } = this.props.teamCollaboratorGoalDetail;

      if(!this.state.initialized && goal && account) {
        this.setState({
          ...this.state,
          initialized: true,
          page: this.state.page === 0 && !goal.allow_ranking ? 1 : this.state.page
        }, () => {
          this.props.handleSubHeader(<SubHeader onChange={this.handlePageChange.bind(this)} activateRank={account.hasGoalRankAccess && goal.allow_ranking} />);
        })
      }
    }

    render() {
        const { account } = this.props.accountDetail;
        const { goal } = this.props.teamCollaboratorGoalDetail;
        const { ranks } = this.props.collaboratorGoalRankList;
        const {teams} = this.props.teamList;


        let customRepartitions = []
        const currentTeam = teams && goal && goal.teamId && teams.find(team => team.id === goal.teamId)
        const { pointRepartitions, loading: goalDefinitionPointRepartitionLoading  } = this.props.goalDefinitionPointRepartitionList
        const { modes: repartitionModes } = this.props.goalDefinitionPointRepartitionModeList
        if(currentTeam && pointRepartitions && repartitionModes) {
          const individualMode = repartitionModes && repartitionModes.find(mode => mode.code === 'I')
          customRepartitions = pointRepartitions && individualMode && currentTeam ? pointRepartitions.filter(repartition => repartition.definition === goal.definition.id && currentTeam.collaborators.map(c => c.id).indexOf(repartition.collaborator) >= 0 && repartition.mode === individualMode.id) : []
        }

        if(!account.hasGoalAccess) {
          return <Redirect to={'/challenges'} />
        }
        return (
            <div>
                { account.hasGoalRankAccess && this.state.page == 0 && goal && goal.allow_ranking && ranks && <CollaboratorGoalRankList account={account} ranks={ranks} /> }
                { this.state.page == 1 && goal && <GoalIndication goal={goal} type='TC' customRepartitions={customRepartitions.map(repartition => ({
                  collaborator: currentTeam.collaborators.find(c => c.id === repartition.collaborator)
                }))} /> }
                { this.state.page == 2 && goal && <CollaboratorGoalList /> }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, collaboratorGoalRankList, teamCollaboratorGoalDetail, goalDefinitionPointRepartitionList, goalDefinitionPointRepartitionModeList, teamList }) => ({
    accountDetail,
    collaboratorGoalRankList,
    teamCollaboratorGoalDetail,
    teamList,
    goalDefinitionPointRepartitionList,
    goalDefinitionPointRepartitionModeList
});

const mapDispatchToProps = (dispatch) => ({
    teamCollaboratorGoalDetailActions: bindActionCreators(teamCollaboratorGoalDetailActions, dispatch),
    collaboratorGoalRankListActions: bindActionCreators(collaboratorGoalRankListActions, dispatch),
    goalDefinitionPointRepartitionListActions: bindActionCreators(goalDefinitionPointRepartitionListActions, dispatch),
    goalDefinitionPointRepartitionModeListActions: bindActionCreators(goalDefinitionPointRepartitionModeListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamCollaboratorGoalDetail)
