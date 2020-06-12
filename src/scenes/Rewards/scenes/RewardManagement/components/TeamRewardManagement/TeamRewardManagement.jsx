import React, {useEffect} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {Grid} from '@material-ui/core'
import {PointSummary} from '..'
import {DefaultTitle, Loader, TeamSelector} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as teamGlobalPointSummaryDetailActions from '../../../../../../services/TeamGlobalPointSummaries/TeamGlobalPointSummaryDetail/actions'
import * as teamRewardOrderCountActions from '../../../../../../services/TeamRewardOrders/TeamRewardOrderCount/actions'

const TeamRewardManagement = ({...props}) => {
    const {summary, loading: teamGlobalPointSummaryDetailLoading} = props.teamGlobalPointSummaryDetail
    const {orders, loading: teamRewardOrderCountLoading} = props.teamRewardOrderCount
    const loading = teamGlobalPointSummaryDetailLoading || teamRewardOrderCountLoading

    useEffect(() => {
        props.teamGlobalPointSummaryDetailActions.getTeamGlobalPointSummary(1)
        props.teamRewardOrderCountActions.countWaitingTeamRewardOrders()
    }, [])

    function handleTeamClick(teamId) {
        props.history.push(`/rewards/teams/${teamId}`)
    }
    function handleTrackingClick() {
        props.history.push('/rewards/tracking/teams')
    }

    function renderLoader() {
        return <Loader centered />
    }

    function renderData() {
        return (
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <PointSummary points={summary.points} usedPoints={summary.usedPoints} waitingPoints={summary.waitingPoints} orders={orders} onTrackingClick={handleTrackingClick} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>{Resources.REWARD_MANAGEMENT_TEAM_SELECTOR_AREA}</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <TeamSelector onClick={handleTeamClick} />
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
const mapStateToProps = ({teamGlobalPointSummaryDetail, teamRewardOrderCount}) => ({
    teamGlobalPointSummaryDetail,
    teamRewardOrderCount
})

const mapDispatchToProps = (dispatch) => ({
    teamGlobalPointSummaryDetailActions: bindActionCreators(teamGlobalPointSummaryDetailActions, dispatch),
    teamRewardOrderCountActions: bindActionCreators(teamRewardOrderCountActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TeamRewardManagement))
