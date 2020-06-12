import React from 'react'
import Grid from "@material-ui/core/Grid";
import {PointSummary, RewardList} from "../../../../components";

const CollaboratorRewardList = ({rewards, summary, ...props}) => {
    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <PointSummary points={summary.points} usedPoints={summary.usedPoints} waitingPoints={summary.waitingPoints} />
                </Grid>
                <Grid item xs={12}>
                    <RewardList rewards={rewards} />
                </Grid>
            </Grid>
        </div>
    )
}

export default CollaboratorRewardList
