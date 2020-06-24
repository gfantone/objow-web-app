import React from 'react'
import {withRouter} from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import {PointSummary, RewardList} from "..";

const RewardStore = ({onAddClick, rewards, summary, ...props}) => {
    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <PointSummary points={summary.points} usedPoints={summary.usedPoints} waitingPoints={summary.waitingPoints} />
                </Grid>
                <Grid item xs={12}>
                    {/* TODO: voir s'il faut mettre tout le code ici pour le composant RewardList */}
                    <RewardList rewards={rewards} onAddClick={onAddClick} />
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(RewardStore)
