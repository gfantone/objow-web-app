import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {CollaboratorRewardList, SubHeader} from './components'
import {MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions'
import * as collaboratorPointSummaryDetailActions from '../../../../services/CollaboratorPointSummaries/CollaboratorPointSummaryDetail/actions'
import * as rewardListActions from '../../../../services/Rewards/RewardList/actions'
import * as teamPointSummaryDetailActions from '../../../../services/TeamPointSummaries/TeamPointSummaryDetail/actions'

class CollaboratorRewardStore extends MainLayoutComponent {
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
        if (account.role.code != 'C') {
            this.props.activateReturn()
        }
        this.props.collaboratorDetailActions.getCollaboratorDetail(id)
        this.props.collaboratorPointSummaryDetailActions.getCollaboratorPointSummary(id, 1)
        this.props.rewardListActions.getActiveRewardList()
        this.props.teamPointSummaryDetailActions.getTeamPointSummaryByCollaborator(id, 1)
    }

    renderData() {
        return (
            <div>
                {this.state.page === 0 && <CollaboratorRewardList collaboratorId={5} />}
            </div>
        )
    }

    render() {
        const {loading: collaboratorDetailLoading} = this.props.collaboratorDetail
        const {summary: collaboratorSummary, loading: collaboratorPointSummaryDetailLoading} = this.props.collaboratorPointSummaryDetail
        const {rewards, loading: rewardListLoading} = this.props.rewardList
        const {summary: teamSummary, loading: teamPointSummaryDetailLoading} = this.props.teamPointSummaryDetail
        const loading = collaboratorDetailLoading || collaboratorPointSummaryDetailLoading || rewardListLoading || teamPointSummaryDetailLoading
        const collaboratorRewards = rewards ? rewards.filter(x => x.type.code === 'P') : null
        const teamRewards = rewards ? rewards.filter(x => x.type.code === 'T') : null
        const canRenderData = !loading && collaboratorSummary && rewards && teamSummary

        return (
            <div>
                {canRenderData && this.state.page ===0 && <CollaboratorRewardList summary={collaboratorSummary} rewards={collaboratorRewards} />}
            </div>
        )
    }

}

const mapStateToProps = ({accountDetail, collaboratorDetail, collaboratorPointSummaryDetail, rewardList, teamPointSummaryDetail}) => ({
    accountDetail,
    collaboratorDetail,
    collaboratorPointSummaryDetail,
    rewardList,
    teamPointSummaryDetail
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorDetailActions: bindActionCreators(collaboratorDetailActions, dispatch),
    collaboratorPointSummaryDetailActions: bindActionCreators(collaboratorPointSummaryDetailActions, dispatch),
    rewardListActions: bindActionCreators(rewardListActions, dispatch),
    teamPointSummaryDetailActions: bindActionCreators(teamPointSummaryDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorRewardStore)
