import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {CollaboratorRewardList, SubHeader, TeamRewardList} from './components'
import {MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamDetailActions from '../../../../services/Teams/TeamDetail/actions'
import * as teamCollaboratorPointSummaryDetailActions from '../../../../services/TeamCollaboratorPointSummaries/TeamCollaboratorPointSummaryDetail/actions'
import * as rewardListActions from '../../../../services/Rewards/RewardList/actions'
import * as teamPointSummaryDetailActions from '../../../../services/TeamPointSummaries/TeamPointSummaryDetail/actions'

class TeamRewardStore extends MainLayoutComponent {
    state = {page: 0}

    handlePageChange(page) {
        this.setState({
            ...this.state,
            page: page
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id
        const {account} = this.props.accountDetail
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<SubHeader page={this.state.page} onChange={this.handlePageChange.bind(this)} />)
        if (account.role.code === 'A') {
            this.props.activateReturn()
        }
        this.props.teamDetailActions.getTeamDetail(id)
        this.props.teamCollaboratorPointSummaryDetailActions.getTeamCollaboratorPointSummary(id, 1)
        this.props.rewardListActions.getActiveRewardList()
        this.props.teamPointSummaryDetailActions.getTeamPointSummaryByTeam(id, 1)
    }

    render() {
        const {loading: teamDetailLoading} = this.props.teamDetail
        const {summary: collaboratorSummary, loading: teamCollaboratorPointSummaryDetailLoading} = this.props.teamCollaboratorPointSummaryDetail
        const {rewards, loading: rewardListLoading} = this.props.rewardList
        const {summary: teamSummary, loading: teamPointSummaryDetailLoading} = this.props.teamPointSummaryDetail
        const loading = teamDetailLoading || teamCollaboratorPointSummaryDetailLoading || rewardListLoading || teamPointSummaryDetailLoading
        const teamRewards = rewards ? rewards.filter(x => x.type.code === 'T') : null
        const canRenderData = !loading && collaboratorSummary && rewards && teamSummary

        return (
            <div>
                {canRenderData && this.state.page ===0 && <TeamRewardList summary={teamSummary} rewards={teamRewards} />}
                {canRenderData && this.state.page ===1 && <CollaboratorRewardList summary={collaboratorSummary} />}
            </div>
        )
    }

}

const mapStateToProps = ({accountDetail, rewardList, teamCollaboratorPointSummaryDetail, teamDetail, teamPointSummaryDetail}) => ({
    accountDetail,
    rewardList,
    teamCollaboratorPointSummaryDetail,
    teamDetail,
    teamPointSummaryDetail
})

const mapDispatchToProps = (dispatch) => ({
    rewardListActions: bindActionCreators(rewardListActions, dispatch),
    teamCollaboratorPointSummaryDetailActions: bindActionCreators(teamCollaboratorPointSummaryDetailActions, dispatch),
    teamDetailActions: bindActionCreators(teamDetailActions, dispatch),
    teamPointSummaryDetailActions: bindActionCreators(teamPointSummaryDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamRewardStore)
