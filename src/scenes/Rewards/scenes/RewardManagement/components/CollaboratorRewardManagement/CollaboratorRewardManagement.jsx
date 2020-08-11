import React, {useEffect} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {PointSummary} from '../../../../components'
import {AdministratorCollaboratorSelector, DefaultTitle, Loader} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as collaboratorGlobalPointSummaryDetailActions from '../../../../../../services/CollaboratorGlobalPointSummaries/CollaboratorGlobalPointSummaryDetail/actions'
import * as collaboratorRewardOrderCountActions from '../../../../../../services/CollaboratorRewardOrders/CollaboratorRewardOrderCount/actions'

const CollaboratorRewardManagement = ({periodId, ...props}) => {
    const {summary, loading: collaboratorGlobalPointSummaryDetailLoading} = props.collaboratorGlobalPointSummaryDetail
    const {orders, loading: collaboratorRewardOrderCountLoading} = props.collaboratorRewardOrderCount
    const loading = collaboratorGlobalPointSummaryDetailLoading || collaboratorRewardOrderCountLoading

    useEffect(() => {
        props.collaboratorGlobalPointSummaryDetailActions.getCollaboratorGlobalPointSummary(periodId)
        props.collaboratorRewardOrderCountActions.countWaitingCollaboratorRewardOrders()
    }, [periodId])

    function renderLoader() {
        return <Loader centered />
    }

    function handleCollaboratorClick(collaboratorId) {
        var url = `/rewards/collaborators/${collaboratorId}`
        if (periodId) url += `?period=${periodId}`
        props.history.push(url)
    }

    function handleTrackingClick() {
        props.history.push('/rewards/tracking/collaborators')
    }

    function renderData() {
        return (
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <PointSummary points={summary.points} usedPoints={summary.usedPoints} validatedValues={summary.validatedValues} waitingPoints={summary.waitingPoints} orders={orders} onTrackingClick={handleTrackingClick} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>{Resources.REWARD_MANAGEMENT_COLLABORATOR_SELECTOR_AREA}</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <AdministratorCollaboratorSelector onClick={handleCollaboratorClick} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    return (
        <div>
            {loading && renderLoader()}
            {!loading && summary && orders != null && renderData()}
        </div>
    )
}

const mapStateToProps = ({collaboratorGlobalPointSummaryDetail, collaboratorRewardOrderCount}) => ({
    collaboratorGlobalPointSummaryDetail,
    collaboratorRewardOrderCount
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorGlobalPointSummaryDetailActions: bindActionCreators(collaboratorGlobalPointSummaryDetailActions, dispatch),
    collaboratorRewardOrderCountActions: bindActionCreators(collaboratorRewardOrderCountActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CollaboratorRewardManagement))
