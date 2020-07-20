import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import {PointSummary} from "../../../../components";
import {DefaultTitle, Loader, ManagerCollaboratorSelector} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as teamCollaboratorPointSummaryDetailActions from '../../../../../../services/TeamCollaboratorPointSummaries/TeamCollaboratorPointSummaryDetail/actions'

const StoreTeamCollaboratorDepartment = ({category, name, period, ...props}) => {
    const {summary, loading} = props.teamCollaboratorPointSummaryDetail

    function handleCollaboratorClick(id) {
        var url = `/rewards/collaborators/${id}`
        if (category || period || name) url += '?'
        if (category) url += `category=${category}`
        if (category && period) url += '&'
        if (period) url += `period=${period}`
        if ((category || period) && name) url += '&'
        if (name) url += `name=${name}`
        props.history.push(url)
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
