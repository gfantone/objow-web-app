import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {RewardOrderItemList, RewardOrderSummary} from '../../components'
import {AppBarSubTitle, DefaultTitle, InfoText, Loader, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorRewardOrderDetailActions from '../../../../services/CollaboratorRewardOrders/CollaboratorRewardOrderDetail/actions'

class CollaboratorRewardOrderSummary extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.COLLABORATOR_REWARD_ORDER_SUMMARY_TITLE} />)
        this.props.collaboratorRewardOrderDetailActions.getCollaboratorRewardOrder(this.props.match.params.id)
        this.props.activateReturn()
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const {order} = this.props.collaboratorRewardOrderDetail
        const name = `${order.counter.collaborator.firstname} ${order.counter.collaborator.lastname}`
        const orderPoints = order.items.map(x => x.quantity * x.reward.points).reduce((a, b) => a + b)
        const orderValue = order.items.map(x => x.quantity * x.reward.value).reduce((a, b) => a + b)

        return (
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <InfoText style={{visibility: 'hidden'}}>Fake</InfoText>
                                <DefaultTitle>{Resources.COLLABORATOR_REWARD_ORDER_SUMMARY_REWARDS_AREA.format(order.id, name)}</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <RewardOrderItemList items={order.items} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>{Resources.COLLABORATOR_REWARD_ORDER_SUMMARY_POINTS_AREA}</DefaultTitle>
                                <InfoText>{Resources.COLLABORATOR_REWARD_ORDER_SUMMARY_POINTS_AREA_YEAR.format(order.counter.period.name)}</InfoText>
                            </Grid>
                            <Grid item xs={12}>
                                <RewardOrderSummary recipientPoints={order.oldPointBalance} orderPoints={orderPoints} orderValue={orderValue} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    render() {
        const {order, loading} = this.props.collaboratorRewardOrderDetail

        if (order && (order.isValid == null || order.isValid === false)) {
            return <Redirect to='/' />
        }

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && order && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({collaboratorRewardOrderDetail}) => ({
    collaboratorRewardOrderDetail
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorRewardOrderDetailActions: bindActionCreators(collaboratorRewardOrderDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorRewardOrderSummary)
