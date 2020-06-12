import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {PointSummary} from '..'
import {AdministratorCollaboratorSelector, DefaultTitle, Loader} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as collaboratorGlobalPointSummaryDetailActions from '../../../../../../services/CollaboratorGlobalPointSummaries/CollaboratorGlobalPointSummaryDetail/actions'
import * as collaboratorRewardOrderCountActions from '../../../../../../services/CollaboratorRewardOrders/CollaboratorRewardOrderCount/actions'

const CollaboratorRewardManagement = ({...props}) => {
    const {summary, loading: collaboratorGlobalPointSummaryDetailLoading} = props.collaboratorGlobalPointSummaryDetail
    const {orders, loading: collaboratorRewardOrderCountLoading} = props.collaboratorRewardOrderCount
    const loading = collaboratorGlobalPointSummaryDetailLoading || collaboratorRewardOrderCountLoading

    useEffect(() => {
        props.collaboratorGlobalPointSummaryDetailActions.getCollaboratorGlobalPointSummary(1)
        props.collaboratorRewardOrderCountActions.countWaitingCollaboratorRewardOrders()
    }, [])

    function renderLoader() {
        return <Loader centered />
    }

    function handleTeamClick(teamId) {
        alert('hello' + teamId)
    }

    function renderData() {
        return (
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <PointSummary points={summary.points} usedPoints={summary.usedPoints} waitingPoints={summary.waitingPoints} orders={orders} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>{Resources.REWARD_MANAGEMENT_COLLABORATOR_SELECTOR_AREA}</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <AdministratorCollaboratorSelector onClick={handleTeamClick} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorRewardManagement)
