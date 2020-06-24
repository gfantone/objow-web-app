import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import {PointSummary} from "../../../../components";
import {DefaultTitle, Loader, ManagerCollaboratorSelector} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as teamCollaboratorPointSummaryDetailActions from '../../../../../../services/TeamCollaboratorPointSummaries/TeamCollaboratorPointSummaryDetail/actions'

const StoreTeamCollaboratorDepartment = ({id, periodId, ...props}) => {
    const {summary, loading} = props.teamCollaboratorPointSummaryDetail

    useEffect(() => {
        props.teamCollaboratorPointSummaryDetailActions.getTeamCollaboratorPointSummary(id, periodId)
    }, [])

    function handleCollaboratorClick(id) {
        props.history.push(`/rewards/collaborators/${id}`)
    }

    function renderLoader() {
        return <Loader centered />
    }

    function renderData() {
        return (
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <PointSummary points={summary.points} usedPoints={summary.usedPoints} waitingPoints={summary.waitingPoints} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <DefaultTitle>{Resources.STORE_TEAM_COLLABORATOR_DEPARTMENT_COLLABORATOR_SELECTOR_AREA}</DefaultTitle>
                        </Grid>
                        <Grid item xs={12}>
                            <ManagerCollaboratorSelector loadDisabled onClick={handleCollaboratorClick} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <div>
            {loading && renderLoader()}
            {!loading && summary && renderData()}
        </div>
    )
}

const mapStateToProps = ({teamCollaboratorPointSummaryDetail}) => ({
    teamCollaboratorPointSummaryDetail
})

const mapDispatchToProps = (dispatch) => ({
    teamCollaboratorPointSummaryDetailActions: bindActionCreators(teamCollaboratorPointSummaryDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoreTeamCollaboratorDepartment))
