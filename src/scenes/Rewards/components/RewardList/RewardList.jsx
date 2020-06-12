import React from 'react'
import {Grid} from '@material-ui/core'
import {Reward} from './components'
import {Card, DefaultTitle} from '../../../../components'
import * as Resources from '../../../../Resources'

const RewardList = ({onRewardClick, rewards, ...props}) => {
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DefaultTitle>{Resources.REWARD_LIST_TITLE}</DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {rewards.map(reward => {
                            return (
                                <Grid key={reward.id} item xs={12} sm={6} md={4}>
                                    <Card>
                                        <Reward reward={reward} onRewardClick={onRewardClick} />
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default RewardList
