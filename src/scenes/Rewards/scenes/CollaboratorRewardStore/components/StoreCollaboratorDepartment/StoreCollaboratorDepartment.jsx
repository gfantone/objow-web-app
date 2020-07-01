import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {RewardStore} from '../../../../components'
import {Loader} from '../../../../../../components'
import * as rewardListActions from '../../../../../../services/Rewards/RewardList/actions'
import * as collaboratorPointSummaryDetailActions from '../../../../../../services/CollaboratorPointSummaries/CollaboratorPointSummaryDetail/actions'

const StoreCollaboratorDepartment = ({categoryId, collaboratorId, name, onAddClick, periodId, ...props}) => {
    const {summary, loading: collaboratorPointSummaryDetailLoading} = props.collaboratorPointSummaryDetail
    const {rewards, loading: rewardListLoading} = props.rewardList
    const collaboratorRewards = rewards ? rewards.filter(x => x.type.code === 'P') : null
    const loading = collaboratorPointSummaryDetailLoading || rewardListLoading

    useEffect(() => {
        props.rewardListActions.getActiveRewardList(name, categoryId)
        props.collaboratorPointSummaryDetailActions.getCollaboratorPointSummary(collaboratorId, periodId)
    }, [categoryId, collaboratorId, name, periodId])

    function renderLoader() {
        return <Loader centered />
    }

    function renderData() {
        return <RewardStore rewards={collaboratorRewards} summary={summary} onAddClick={onAddClick} />
    }

    return (
        <div>
            {loading && renderLoader()}
            {!loading && collaboratorRewards && summary && renderData()}
        </div>
    )
}

const mapStateToProps = ({collaboratorPointSummaryDetail, rewardList}) => ({
    collaboratorPointSummaryDetail,
    rewardList
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorPointSummaryDetailActions: bindActionCreators(collaboratorPointSummaryDetailActions, dispatch),
    rewardListActions: bindActionCreators(rewardListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreCollaboratorDepartment)
