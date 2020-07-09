import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {RewardOrderItemList, RewardOrderSummary} from '../../components'
import {DefaultTitle, InfoText, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as shoppingCartActions from '../../../../services/ShoppingCart/actions'

class ShoppingCart extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.activateReturn()
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

    handleItemsChange(reward, quantity) {
        this.props.shoppingCartActions.changeItem(reward, quantity)
    }

    handleOrderClick() {
        alert('TODO : commander...')
    }

    render() {
        const {account} = this.props.accountDetail
        const {items} = this.props.shoppingCart
        const {summary: collaboratorPointSummary} = this.props.collaboratorPointSummaryDetail
        const {summary: teamPointSummary} = this.props.teamPointSummaryDetail
        const recipientPoints = this.calculateRecipientPoints()
        const hasItems = items.length > 0
        const orderPoints = hasItems ? items.map(x => x.quantity * x.reward.points).reduce((a, b) => a + b) : 0
        const orderValue = hasItems ? items.map(x => x.quantity * x.reward.value).reduce((a, b) => a + b) : 0
        const periodName = account.role.code === 'C' ? collaboratorPointSummary.period.name : account.role.code === 'M' ? teamPointSummary.period.name : ''

        if (account.role.code === 'A') {
            return <Redirect to='/' />
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
                                <RewardOrderSummary recipientPoints={recipientPoints} orderPoints={orderPoints} orderValue={orderValue} onOrderClick={hasItems ? this.handleOrderClick.bind(this) : null} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = ({accountDetail, collaboratorPointSummaryDetail, shoppingCart, teamPointSummaryDetail}) => ({
    accountDetail,
    collaboratorPointSummaryDetail,
    shoppingCart,
    teamPointSummaryDetail
})

const mapDispatchToProps = (dispatch) => ({
    shoppingCartActions: bindActionCreators(shoppingCartActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
