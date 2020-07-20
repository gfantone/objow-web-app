import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CollaboratorGoalList, SubHeader } from './components'
import { CollaboratorGoalRankList, GoalIndication } from '../../components'
import { MainLayoutComponent } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamCollaboratorGoalDetailActions from '../../../../services/TeamCollaboratorGoals/TeamCollaboratorGoalDetail/actions'
import * as collaboratorGoalRankListActions from '../../../../services/CollaboratorGoalRanks/CollaboratorGoalRankList/actions'

class TeamCollaboratorGoalDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        const { account } = this.props.accountDetail;
        this.state = {
            page: account.hasGoalRankAccess ? 0 : 1
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
    }

    render() {
        const { account } = this.props.accountDetail;
        const { goal } = this.props.teamCollaboratorGoalDetail;
        const { ranks } = this.props.collaboratorGoalRankList;

        return (
            <div>
                { account.hasGoalRankAccess && this.state.page == 0 && ranks && <CollaboratorGoalRankList ranks={ranks} /> }
                { this.state.page == 1 && goal && <GoalIndication goal={goal} type='TC' /> }
                { this.state.page == 2 && goal && <CollaboratorGoalList /> }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, collaboratorGoalRankList, teamCollaboratorGoalDetail }) => ({
    accountDetail,
    collaboratorGoalRankList,
    teamCollaboratorGoalDetail
});

const mapDispatchToProps = (dispatch) => ({
    teamCollaboratorGoalDetailActions: bindActionCreators(teamCollaboratorGoalDetailActions, dispatch),
    collaboratorGoalRankListActions: bindActionCreators(collaboratorGoalRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamCollaboratorGoalDetail)
