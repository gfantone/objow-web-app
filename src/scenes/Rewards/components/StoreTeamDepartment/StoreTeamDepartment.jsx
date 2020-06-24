import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {RewardStore} from '..'
import {Loader} from '../../../../components'
import * as rewardListActions from '../../../../services/Rewards/RewardList/actions'
import * as teamPointSummaryDetailActions from '../../../../services/TeamPointSummaries/TeamPointSummaryDetail/actions'

const StoreTeamDepartment = ({id, onAddClick, periodId, ...props}) => {
    const {rewards, loading: rewardListLoading} = props.rewardList
    const {summary, loading: teamPointSummaryDetailLoading} = props.teamPointSummaryDetail
    const teamRewards = rewards ? rewards.filter(x => x.type.code === 'T') : null
    const loading = rewardListLoading || teamPointSummaryDetailLoading

    useEffect(() => {
        props.rewardListActions.getActiveRewardList()
        props.teamPointSummaryDetailActions.getTeamPointSummaryByTeam(id, periodId)
    }, [])

    function renderLoader() {
        return <Loader centered />
    }

    function renderData() {
        return <RewardStore rewards={teamRewards} summary={summary} onAddClick={onAddClick} />
    }

    return (
        <div>
            {loading && renderLoader()}
            {!loading && teamRewards && summary && renderData()}
        </div>
    )
}

const mapStateToProps = ({rewardList, teamPointSummaryDetail}) => ({
    rewardList,
    teamPointSummaryDetail
})

const mapDispatchToProps = (dispatch) => ({
    rewardListActions: bindActionCreators(rewardListActions, dispatch),
    teamPointSummaryDetailActions: bindActionCreators(teamPointSummaryDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreTeamDepartment)
