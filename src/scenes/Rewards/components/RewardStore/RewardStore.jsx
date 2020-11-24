import React from 'react'
import {withRouter} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {PointSummary, Reward} from '..'
import {BasicSelect, Card, DefaultTitle, EmptyState} from '../../../../components'
import * as Resources from '../../../../Resources'

const useStyles = makeStyles({
    zoom: {
        transition: 'transform .5s',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    }
})

const sortOptions = [
    {value: 1, text: 'Nombre de points croissant'},
    {value: 2, text: 'Nombre de points décroissant'},
]

const RewardStore = ({onAddClick, rewards, summary, ...props}) => {
    const classes = useStyles()
    const [sort, setSort] = React.useState(sortOptions[0].value)
    const sortedRewards = sort === 1 ? rewards.sort(function (a, b) {
        const x = a.points
        const y = b.points
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    }) : rewards.sort(function (a, b) {
        const x = a.points
        const y = b.points
        return ((x < y) ? 1 : ((x > y) ? -1 : 0))
    })

    function handleSortChange(newSort) {
        setSort(Number(newSort))
    }

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <PointSummary points={summary.points} usedPoints={summary.usedPoints} validatedValues={summary.validatedValues} waitingPoints={summary.waitingPoints} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify='space-between' alignItems='flex-end'>
                                <Grid item>
                                    <DefaultTitle>{Resources.REWARD_LIST_TITLE}</DefaultTitle>
                                </Grid>
                                <Grid item>
                                    <BasicSelect name='hello' label='Trier par' initial={sort} options={sortOptions} optionValueName='value' optionTextName='text' emptyDisabled onChange={handleSortChange} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {rewards.length === 0 && <EmptyState title={Resources.REWARD_STORE_EMPTY_STATE_TITLE} message={Resources.REWARD_STORE_EMPTY_STATE_MESSAGE} />}
                            {rewards.length > 0 && <Grid container spacing={3}>
                                {sortedRewards.map(reward => {
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
