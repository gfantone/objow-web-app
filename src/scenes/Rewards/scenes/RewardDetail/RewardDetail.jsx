import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Hidden} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCopy, faEdit, faFolderOpen} from '@fortawesome/free-solid-svg-icons'
import {HorizontalExplanation, RewardDetailImage, SubHeader, VerticalExplanation} from './components'
import {ShoppingCartAddingConfirmation, ShoppingCartButton} from '../../components'
import {AccentText, BoldSpan, Card, DefaultText, DefaultTitle, IconButton, InfoText, Linkify, MainLayoutComponent, Quantity} from '../../../../components'
import * as Resources from '../../../../Resources'
import '../../../../helpers/StringHelper'
import * as rewardDetailActions from '../../../../services/Rewards/RewardDetail/actions'
import * as shoppingCartActions from '../../../../services/ShoppingCart/actions'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const DEFAULT_QUANTITY = 1

const styles = {
    panel: {
        backgroundColor: 'initial',
        borderRadius: 'initial',
        boxShadow: 'none'
    },
    panelSummary: {
        margin: 'none',
        padding: 'initial'
    },
    panelSummaryIcon: {
        color: '#00E58D'
    },
    panelDetails: {
        padding: 'initial'
    }
}

class RewardDetail extends MainLayoutComponent {
    state = {expanded: false, quantity: DEFAULT_QUANTITY}

    constructor(props) {
        super(props)
        this.id = null
    }

    handleAddClick() {
        const {reward} = this.props.rewardDetail
        const item = {reward: reward, quantity: this.state.quantity}
        this.props.shoppingCartActions.addItem(item)
    }

    loadData() {
        const id = this.props.match.params.id
        if (this.id !== id) {
            const {account} = this.props.accountDetail
            this.id = id
            this.props.handleButtons(<div style={{display: 'contents'}}>
                {account.role.code === 'A' && <IconButton size='small' onClick={() => this.props.history.push(`/rewards/duplication/${id}`)} style={{marginRight: 8}}><FontAwesomeIcon icon={faCopy} /></IconButton>}
                {account.role.code === 'A' && <IconButton size='small' onClick={() => this.props.history.push(`/rewards/modification/${id}`)}><FontAwesomeIcon icon={faEdit} /></IconButton>}
                {account.role.code !== 'A' && <ShoppingCartButton />}
            </div>)
            this.props.rewardDetailActions.getReward(id)
        }
    }

    componentDidMount() {
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<SubHeader onAddClick={this.handleAddClick.bind(this)} />)
        this.props.activateReturn()
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData()
    }

    getLastReward(reward) {
        var lastReward = reward
        while (lastReward.new) {
            lastReward = lastReward.new
        }
        return lastReward
    }

    handleExpansionChange(event, expanded) {
        this.setState({
            ...this.state,
            expanded: expanded
        })
    }

    handleQuantityChange(quantity) {
        this.setState({
            ...this.state,
            quantity: quantity
        })
    }

    render() {
        const {classes} = this.props
        const {account} = this.props.accountDetail
        const {reward, loading} = this.props.rewardDetail
        const image = reward ? (reward.image ? reward.image.path : reward.customImage) : null

        if (reward && !reward.isActive && reward.new) {
            const lastReward = this.getLastReward(reward)
            this.props.history.replace(`/rewards/detail/${lastReward.id}`)
        } else if (reward && !reward.isActive && !reward.new) {
            return <Redirect to='/' />
        }

        return (
            <div>
                {!loading && reward && <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <DefaultTitle>{Resources.REWARD_DETAIL_DESCRIPTION_AREA}</DefaultTitle>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item xs>
                                    <Grid container spacing={2}>
                                        <Grid item xs>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <DefaultText>
                                                        <BoldSpan>{reward.name}</BoldSpan>
                                                    </DefaultText>
                                                </Grid>
                                                <Grid item>
                                                    <DefaultText>
                                                        <BoldSpan><FontAwesomeIcon icon={faFolderOpen} /> {reward.category.name}</BoldSpan>
                                                    </DefaultText>
                                                </Grid>
                                                <Grid item>
                                                    <DefaultText>
                                                        <BoldSpan>{Resources.REWARD_DETAIL_VALUE_TEXT.format(reward.value)}</BoldSpan>
                                                    </DefaultText>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {(account.role.code === 'C' && reward.type.code === 'P' || account.role.code === 'M' && reward.type.code === 'T') && <Grid item>
                                            <Grid container spacing={1} direction='column' alignItems='center'>
                                                <Grid item>
                                                    <DefaultText>Quantité</DefaultText>
                                                </Grid>
                                                <Grid item>
                                                    <Quantity initial={DEFAULT_QUANTITY} minimum={1} onChange={this.handleQuantityChange.bind(this)} />
                                                </Grid>
                                            </Grid>
                                        </Grid>}
                                        <Grid item xs={12}>
                                            <Linkify>
                                                <InfoText>
                                                    {reward.description.split("\n").map((i, key) => {
                                                        return <div key={key}>{i}</div>;
                                                    })}
                                                </InfoText>
                                            </Linkify>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <DefaultText>
                                                <BoldSpan>{Resources.REWARD_DETAIL_DELIVERY_TITLE}</BoldSpan>
                                            </DefaultText>
                                            <DefaultText>{Resources.REWARD_DETAIL_DELIVERY_PLACE_TEXT.format(reward.deliveryPlace)}</DefaultText>
                                            <DefaultText>{Resources.REWARD_DETAIL_DELIVERY_MODE_TEXT.format(reward.deliveryMode)}</DefaultText>
                                            {reward.deliveryTime && reward.deliveryTime !== '' && <DefaultText>{Resources.REWARD_DETAIL_DELIVERY_TIME_TEXT.format(reward.deliveryTime)}</DefaultText>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md='auto'>
                                    <RewardDetailImage image={image} />
                                </Grid>
                                <Grid item xs={12}>
                                    <ExpansionPanel expanded={this.state.expanded} onChange={this.handleExpansionChange.bind(this)} className={classes.panel}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.panelSummaryIcon} />} className={classes.panelSummary}>
                                            <AccentText><BoldSpan>{Resources.REWARD_DETAIL_OPERATION_TITLE}</BoldSpan></AccentText>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails className={classes.panelDetails}>
                                            <Hidden smDown>
                                                <HorizontalExplanation />
                                            </Hidden>
                                            <Hidden mdUp>
                                                <VerticalExplanation />
                                            </Hidden>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>}
                <ShoppingCartAddingConfirmation />
            </div>
        )
    }
}

const mapStateToProps = ({accountDetail, rewardDetail}) => ({
    accountDetail,
    rewardDetail
})

const mapDispatchToProps = (dispatch) => ({
    rewardDetailActions: bindActionCreators(rewardDetailActions, dispatch),
    shoppingCartActions: bindActionCreators(shoppingCartActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RewardDetail))
