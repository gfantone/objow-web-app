import React from 'react'
import {withRouter} from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import {PointSummary, Reward} from "..";
import {DefaultTitle} from "../../../../components/Common/components/Texts/components/DefaultTitle";
import * as Resources from "../../../../Resources";
import {EmptyState} from "../../../../components/Common/components/EmptyState";
import {Card} from "../../../../components/Common/components/Card";

const RewardStore = ({onAddClick, rewards, summary, ...props}) => {
    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <PointSummary points={summary.points} usedPoints={summary.usedPoints} waitingPoints={summary.waitingPoints} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <DefaultTitle>{Resources.REWARD_LIST_TITLE}</DefaultTitle>
                        </Grid>
                        <Grid item xs={12}>
                            {rewards.length === 0 && <EmptyState title='Aucune récompense trouvée' message='Si vous avez appliqué des filtres, changez-les pour afficher d’autres récompenses' />}
                            {rewards.length > 0 && <Grid container spacing={2}>
                                {rewards.map(reward => {
                                    return (
                                        <Grid key={reward.id} item xs={12} sm={6} md={4}>
                                            <Card>
                                                <Reward reward={reward} onAddClick={onAddClick} />
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(RewardStore)
