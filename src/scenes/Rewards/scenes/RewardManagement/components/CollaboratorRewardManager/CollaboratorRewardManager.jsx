import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {PointSummary} from '..'
import {AdministratorCollaboratorSelector, DefaultTitle, Loader} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as collaboratorGlobalPointSummaryDetailActions from '../../../../../../services/CollaboratorGlobalPointSummaries/CollaboratorGlobalPointSummaryDetail/actions'

const CollaboratorRewardManager = ({...props}) => {
    const {summary, loading} = props.collaboratorGlobalPointSummaryDetail

    useEffect(() => {
        props.collaboratorGlobalPointSummaryDetailActions.getCollaboratorGlobalPointSummary(1)
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
                        <PointSummary points={summary.points} usedPoints={summary.usedPoints} waitingPoints={summary.waitingPoints} orders={999} />
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
            {!loading && summary && renderData()}
        </div>
    )
}

const mapStateToProps = ({collaboratorGlobalPointSummaryDetail, teamList}) => ({
    collaboratorGlobalPointSummaryDetail,
    teamList
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorGlobalPointSummaryDetailActions: bindActionCreators(collaboratorGlobalPointSummaryDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorRewardManager)
