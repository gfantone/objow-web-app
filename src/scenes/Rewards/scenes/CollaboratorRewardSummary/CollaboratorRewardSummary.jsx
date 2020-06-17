import React from 'react'
import {Grid} from '@material-ui/core'
import {RewardOrderItemList, RewardOrderSummary} from '../../components'
import {AppBarSubTitle, DefaultTitle, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'

class CollaboratorRewardSummary extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.COLLABORATOR_REWARD_ORDER_SUMMARY_TITLE} />)
    }

    renderData() {
        return (
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>{Resources.COLLABORATOR_REWARD_SUMMARY_REWARDS_AREA}</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <RewardOrderItemList items={test} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>{Resources.COLLABORATOR_REWARD_SUMMARY_POINTS_AREA}</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <RewardOrderSummary recipientPoints={999999} orderPoints={1} orderValue={99999} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default CollaboratorRewardSummary
