import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {RewardOrderItemList, RewardOrderSummary} from '../../components'
import {AppBarSubTitle, DefaultTitle, InfoText, Loader, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorRewardOrderDetailActions from '../../../../services/CollaboratorRewardOrders/CollaboratorRewardOrderDetail/actions'

class CollaboratorRewardOrderValidation extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.COLLABORATOR_REWARD_ORDER_VALIDATION_TITLE} />)
        this.props.collaboratorRewardOrderDetailActions.getCollaboratorRewardOrder(this.props.match.params.id)
        this.props.activateReturn()
    }

    handleRefuseClick() {
        alert('refused')
    }

    handleValidateClick() {
        alert('validated')
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
                                <DefaultTitle>{Resources.COLLABORATOR_REWARD_ORDER_VALIDATION_REWARDS_AREA.format(order.id, name)}</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <RewardOrderItemList items={order.items} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>{Resources.COLLABORATOR_REWARD_ORDER_VALIDATION_POINTS_AREA}</DefaultTitle>
                                <InfoText>{Resources.COLLABORATOR_REWARD_ORDER_VALIDATION_POINTS_AREA_YEAR.format(order.counter.period.name)}</InfoText>
                            </Grid>
                            <Grid item xs={12}>
                                <RewardOrderSummary recipientPoints={order.oldPointBalance} orderId={order.id} orderPoints={orderPoints} orderValue={orderValue} onRefuseClick={this.handleRefuseClick.bind(this)} onValidateClick={this.handleValidateClick.bind(this)} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    render() {
        const {order, loading} = this.props.collaboratorRewardOrderDetail

        if (!loading && order && order.id == this.props.match.params.id && (order.isValid === true || order.isValid === false)) {
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

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorRewardOrderValidation)
