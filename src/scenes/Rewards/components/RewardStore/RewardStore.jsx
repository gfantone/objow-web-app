import React from 'react'
import {withRouter} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {PointSummary, Reward} from '..'
import {Card, DefaultTitle, EmptyState} from '../../../../components'
import * as Resources from '../../../../Resources'

const useStyles = makeStyles({
    zoom: {
        transition: 'transform .5s',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    }
})

const RewardStore = ({onAddClick, rewards, summary, ...props}) => {
    const classes = useStyles()

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <PointSummary points={summary.points} usedPoints={summary.usedPoints} validatedValues={summary.validatedValues} waitingPoints={summary.waitingPoints} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <DefaultTitle>{Resources.REWARD_LIST_TITLE}</DefaultTitle>
                        </Grid>
                        <Grid item xs={12}>
                            {rewards.length === 0 && <EmptyState title={Resources.REWARD_STORE_EMPTY_STATE_TITLE} message={Resources.REWARD_STORE_EMPTY_STATE_MESSAGE} />}
                            {rewards.length > 0 && <Grid container spacing={3}>
                                {rewards.map(reward => {
                                    return (
                                        <Grid key={reward.id} item xs={12} sm={6} md={4}>
                                            <Card className={classes.zoom}>
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
