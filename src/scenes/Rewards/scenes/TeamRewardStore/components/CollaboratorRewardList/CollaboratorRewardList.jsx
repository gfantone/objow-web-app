import React from 'react'
import {withRouter} from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import {PointSummary} from "../../../../components";
import {DefaultTitle, ManagerCollaboratorSelector} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const CollaboratorRewardList = ({summary, ...props}) => {
    function handleCollaboratorClick(id) {
        props.history.push(`/rewards/collaborators/${id}`)
    }

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <PointSummary points={summary.points} usedPoints={summary.usedPoints} waitingPoints={summary.waitingPoints} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <DefaultTitle>{Resources.TEAM_REWARD_STORE_COLLABORATOR_SELECTOR_AREA}</DefaultTitle>
                        </Grid>
                        <Grid item xs={12}>
                            <ManagerCollaboratorSelector loadDisabled onClick={handleCollaboratorClick} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(CollaboratorRewardList)
