import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {RewardOrderItemList, RewardOrderSummary} from '../../components'
import {AppBarSubTitle, DefaultTitle, InfoText, Loader, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorRewardOrderDetailActions from '../../../../services/CollaboratorRewardOrders/CollaboratorRewardOrderDetail/actions'
import * as collaboratorRewardOrderUpdateActions from '../../../../services/CollaboratorRewardOrders/CollaboratorRewardOrderUpdate/actions'

class CollaboratorRewardOrderValidation extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.COLLABORATOR_REWARD_ORDER_VALIDATION_TITLE} />)
        this.props.activateReturn()
        this.props.collaboratorRewardOrderDetailActions.getCollaboratorRewardOrder(this.props.match.params.id, true)
        this.props.collaboratorRewardOrderUpdateActions.clearCollaboratorRewardOrderUpdate()
    }

    handleRefuseClick() {
        const {order} = this.props.collaboratorRewardOrderDetail
        const oldPointBalance = order.pointSummary ? order.pointSummary.points - order.pointSummary.usedPoints : 0
        this.props.collaboratorRewardOrderUpdateActions.updateCollaboratorRewardOrder(this.props.match.params.id, oldPointBalance, false)
    }

    handleValidateClick() {
        const {order} = this.props.collaboratorRewardOrderDetail
        const oldPointBalance = order.pointSummary ? order.pointSummary.points - order.pointSummary.usedPoints : 0
        this.props.collaboratorRewardOrderUpdateActions.updateCollaboratorRewardOrder(this.props.match.params.id, oldPointBalance, true)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const {order} = this.props.collaboratorRewardOrderDetail
        const {loading} = this.props.collaboratorRewardOrderUpdate
        const name = `${order.counter.collaborator.firstname} ${order.counter.collaborator.lastname}`
        const recipientPoints = order.pointSummary ? order.pointSummary.points - order.pointSummary.usedPoints : 0
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
                                <RewardOrderSummary
                                    recipientPoints={recipientPoints}
                                    orderId={order.id}
                                    orderPoints={orderPoints}
                                    orderValue={orderValue}
                                    onRefuseClick={this.handleRefuseClick.bind(this)}
                                    onValidateClick={this.handleValidateClick.bind(this)}
                                    updateLoading={loading}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    render() {
        const {order, loading} = this.props.collaboratorRewardOrderDetail
        const {success} = this.props.collaboratorRewardOrderUpdate

        if (!loading && order && order.id == this.props.match.params.id && (order.isValid === true || order.isValid === false)) {
            return <Redirect to='/' />
        }

        if (success) {
            this.props.collaboratorRewardOrderUpdateActions.clearCollaboratorRewardOrderUpdate()
            this.props.history.goBack()
        }

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && order && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({collaboratorRewardOrderDetail, collaboratorRewardOrderUpdate}) => ({
    collaboratorRewardOrderDetail,
    collaboratorRewardOrderUpdate
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorRewardOrderDetailActions: bindActionCreators(collaboratorRewardOrderDetailActions, dispatch),
    collaboratorRewardOrderUpdateActions: bindActionCreators(collaboratorRewardOrderUpdateActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorRewardOrderValidation)
