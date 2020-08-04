import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {RewardOrderItemList, RewardOrderSummary} from '../../components'
import {DefaultTitle, InfoText, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorRewardOrderCreationActions from '../../../../services/CollaboratorRewardOrders/CollaboratorRewardOrderCreation/actions'
import * as shoppingCartActions from '../../../../services/ShoppingCart/actions'
import * as teamRewardOrderCreationActions from '../../../../services/TeamRewardOrders/TeamRewardOrderCreation/actions'

class ShoppingCart extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.activateReturn()
        this.props.collaboratorRewardOrderCreationActions.clearCollaboratorRewardOrderCreation()
        this.props.teamRewardOrderCreationActions.clearTeamRewardOrderCreation()
    }

    calculateRecipientPoints() {
        const {account} = this.props.accountDetail
        if (account.role.code === 'C') {
            const {summary: collaboratorPointSummary} = this.props.collaboratorPointSummaryDetail
            return collaboratorPointSummary.points - collaboratorPointSummary.usedPoints - collaboratorPointSummary.waitingPoints
        } else if (account.role.code === 'M') {
            const {summary: teamPointSummary} = this.props.teamPointSummaryDetail
            return teamPointSummary.points - teamPointSummary.usedPoints - teamPointSummary.waitingPoints
        } else return 0
    }

    getCounterId() {
        const {account} = this.props.accountDetail
        var summary = null
        if (account.role.code === 'C') {
            summary = this.props.collaboratorPointSummaryDetail.summary
        } else if (account.role.code === 'M') {
            summary = this.props.teamPointSummaryDetail.summary
        }
        return summary ? summary.counterId : null
    }

    handleItemsChange(reward, quantity) {
        this.props.shoppingCartActions.changeItem(reward, quantity)
    }

    handleOrderClick() {
        const {account} = this.props.accountDetail
        const {items} = this.props.shoppingCart
        const counterId = this.getCounterId()
        const order = {counter: counterId}
        const orderItems = items.map(x => ({reward: x.reward.id, quantity: x.quantity}))
        if (account.role.code === 'C') {
            this.props.collaboratorRewardOrderCreationActions.createCollaboratorRewardOrder(order, orderItems)
        } else {
            this.props.teamRewardOrderCreationActions.createTeamRewardOrder(order, orderItems)
        }
    }

    render() {
        const {account} = this.props.accountDetail
        const {items} = this.props.shoppingCart
        const {summary: collaboratorPointSummary} = this.props.collaboratorPointSummaryDetail
        const {summary: teamPointSummary} = this.props.teamPointSummaryDetail
        const {success: collaboratorRewardOrderCreationSuccess, loading: collaboratorRewardOrderCreationLoading} = this.props.collaboratorRewardOrderCreation
        const {success: teamRewardOrderCreationSuccess, loading: teamRewardOrderCreationLoading} = this.props.teamRewardOrderCreation
        const recipientPoints = this.calculateRecipientPoints()
        const hasItems = items.length > 0
        const orderPoints = hasItems ? items.map(x => x.quantity * x.reward.points).reduce((a, b) => a + b) : 0
        const orderValue = hasItems ? items.map(x => x.quantity * x.reward.value).reduce((a, b) => a + b) : 0
        const periodName = account.role.code === 'C' ? collaboratorPointSummary.period.name : account.role.code === 'M' ? teamPointSummary.period.name : ''
        const success = collaboratorRewardOrderCreationSuccess || teamRewardOrderCreationSuccess
        const loading = collaboratorRewardOrderCreationLoading || teamRewardOrderCreationLoading

        if (account.role.code === 'A') {
            return <Redirect to='/' />
        }

        if (success) {
            this.props.collaboratorRewardOrderCreationActions.clearCollaboratorRewardOrderCreation()
            this.props.teamRewardOrderCreationActions.clearTeamRewardOrderCreation()
            this.props.shoppingCartActions.clearShoppingCart()
            this.props.history.push('/rewards')
        }

        return (
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <InfoText style={{visibility: 'hidden'}}>Fake</InfoText>
                                <DefaultTitle>{Resources.REWARD_SHOPPING_CART_REWARDS_AREA}</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <RewardOrderItemList items={items} onItemChange={this.handleItemsChange.bind(this)} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>{Resources.REWARD_SHOPPING_CART_POINTS_AREA}</DefaultTitle>
                                <InfoText>{Resources.REWARD_SHOPPING_CART_POINTS_AREA_YEAR.format(periodName)}</InfoText>
                            </Grid>
                            <Grid item xs={12}>
                                <RewardOrderSummary recipientPoints={recipientPoints} orderPoints={orderPoints} orderValue={orderValue} orderLoading={loading} onOrderClick={hasItems ? this.handleOrderClick.bind(this) : null} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = ({accountDetail, collaboratorPointSummaryDetail, collaboratorRewardOrderCreation, shoppingCart, teamPointSummaryDetail, teamRewardOrderCreation}) => ({
    accountDetail,
    collaboratorPointSummaryDetail,
    collaboratorRewardOrderCreation,
    shoppingCart,
    teamPointSummaryDetail,
    teamRewardOrderCreation
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorRewardOrderCreationActions: bindActionCreators(collaboratorRewardOrderCreationActions, dispatch),
    shoppingCartActions: bindActionCreators(shoppingCartActions, dispatch),
    teamRewardOrderCreationActions: bindActionCreators(teamRewardOrderCreationActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
