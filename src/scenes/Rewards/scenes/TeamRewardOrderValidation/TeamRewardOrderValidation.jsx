import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {RewardOrderItemList, RewardOrderSummary} from '../../components'
import {AppBarSubTitle, DefaultTitle, InfoText, Loader, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamRewardOrderDetailActions from '../../../../services/TeamRewardOrders/TeamRewardOrderDetail/actions'
import * as teamRewardOrderUpdateActions from '../../../../services/TeamRewardOrders/TeamRewardOrderUpdate/actions'

class TeamRewardOrderValidation extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.TEAM_REWARD_ORDER_VALIDATION_TITLE} />)
        this.props.activateReturn()
        this.props.teamRewardOrderDetailActions.getTeamRewardOrder(this.props.match.params.id, true)
        this.props.teamRewardOrderUpdateActions.clearTeamRewardOrderUpdate()
    }

    handleRefuseClick() {
        const {order} = this.props.teamRewardOrderDetail
        const recipientPoints = order.pointSummary ? order.pointSummary.points - order.pointSummary.usedPoints - order.pointSummary.waitingPoints : 0
        this.props.teamRewardOrderUpdateActions.updateTeamRewardOrder(this.props.match.params.id, recipientPoints, false)
    }

    handleValidateClick() {
        const {order} = this.props.teamRewardOrderDetail
        const recipientPoints = order.pointSummary ? order.pointSummary.points - order.pointSummary.usedPoints - order.pointSummary.waitingPoints : 0
        this.props.teamRewardOrderUpdateActions.updateTeamRewardOrder(this.props.match.params.id, recipientPoints, true)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const {order} = this.props.teamRewardOrderDetail
        const {loading} = this.props.teamRewardOrderUpdate
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
                                <DefaultTitle>{Resources.TEAM_REWARD_ORDER_VALIDATION_REWARDS_AREA.format(order.id, order.counter.team.name)}</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <RewardOrderItemList items={order.items} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>{Resources.TEAM_REWARD_ORDER_VALIDATION_POINTS_AREA}</DefaultTitle>
                                <InfoText>{Resources.TEAM_REWARD_ORDER_VALIDATION_POINTS_AREA_YEAR.format(order.counter.period.name)}</InfoText>
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
        const {order, loading} = this.props.teamRewardOrderDetail
        const {success} = this.props.teamRewardOrderUpdate

        if (!loading && order && order.id == this.props.match.params.id && (order.isValid === true || order.isValid === false)) {
            return <Redirect to='/' />
        }

        if (success) {
            this.props.teamRewardOrderUpdateActions.clearTeamRewardOrderUpdate()
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

const mapStateToProps = ({teamRewardOrderDetail, teamRewardOrderUpdate}) => ({
    teamRewardOrderDetail,
    teamRewardOrderUpdate
})

const mapDispatchToProps = (dispatch) => ({
    teamRewardOrderDetailActions: bindActionCreators(teamRewardOrderDetailActions, dispatch),
    teamRewardOrderUpdateActions: bindActionCreators(teamRewardOrderUpdateActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamRewardOrderValidation)
