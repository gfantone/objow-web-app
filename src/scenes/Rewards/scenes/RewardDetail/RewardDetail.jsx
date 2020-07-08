import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {CardMedia, Grid, Step} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolderOpen} from '@fortawesome/free-solid-svg-icons'
import {SubHeader} from './components'
import {ShoppingCartAddingConfirmation, ShoppingCartButton} from '../../components'
import {BoldSpan, Card, Chip, DefaultText, DefaultTitle, InfoText, Linkify, MainLayoutComponent, Quantity, StepConnector, StepLabel, Stepper} from '../../../../components'
import * as Resources from '../../../../Resources'
import '../../../../helpers/StringHelper'
import * as rewardDetailActions from '../../../../services/Rewards/RewardDetail/actions'
import * as shoppingCartActions from '../../../../services/ShoppingCart/actions'

const styles = {
    image: {
        width: 412,
        height: 250
    }
}

const DEFAULT_QUANTITY = 1

class RewardDetail extends MainLayoutComponent {
    state = {quantity: DEFAULT_QUANTITY}

    handleAddClick() {
        const {reward} = this.props.rewardDetail
        const item = {reward: reward, quantity: this.state.quantity}
        this.props.shoppingCartActions.addToShoppingCart(item)
    }

    componentDidMount() {
        const {account} = this.props.accountDetail
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<SubHeader onAddClick={this.handleAddClick.bind(this)} />)
        this.props.handleButtons(<div style={{display: 'contents'}}>
            {account.role.code !== 'A' && <ShoppingCartButton style={{marginLeft: 8}} />}
        </div>)
        this.props.activateReturn()
        this.props.rewardDetailActions.getReward(this.props.match.params.id)
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

        if (reward && !reward.isActive) {
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
                                                    <Quantity initial={DEFAULT_QUANTITY} onChange={this.handleQuantityChange.bind(this)} />
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
                                <Grid item>
                                    <CardMedia image={image} className={classes.image} />
                                </Grid>
                                <Grid item xs={12}>
                                    <DefaultText>
                                        <BoldSpan>{Resources.REWARD_DETAIL_OPERATION_TITLE}</BoldSpan>
                                    </DefaultText>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stepper alternativeLabel nonLinear activeStep={3} connector={<StepConnector />}>
                                        <Step>
                                            <StepLabel optional={<DefaultText>{Resources.REWARD_DETAIL_OPERATION_STEP_1_DESCRIPTION}</DefaultText>} icon={<Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_1_NUMBER} />}>
                                                <DefaultText>
                                                    <BoldSpan>{Resources.REWARD_DETAIL_OPERATION_STEP_1_TITLE}</BoldSpan>
                                                </DefaultText>
                                            </StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel optional={<DefaultText>{Resources.REWARD_DETAIL_OPERATION_STEP_2_DESCRIPTION}</DefaultText>} icon={<Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_2_NUMBER} />}>
                                                <DefaultText>
                                                    <BoldSpan>{Resources.REWARD_DETAIL_OPERATION_STEP_2_TITLE}</BoldSpan>
                                                </DefaultText>
                                            </StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel optional={<DefaultText>{Resources.REWARD_DETAIL_OPERATION_STEP_3_DESCRIPTION}</DefaultText>} icon={<Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_3_NUMBER} />}>
                                                <DefaultText>
                                                    <BoldSpan>{Resources.REWARD_DETAIL_OPERATION_STEP_3_TITLE}</BoldSpan>
                                                </DefaultText>
                                            </StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel optional={<DefaultText>{Resources.REWARD_DETAIL_OPERATION_STEP_4_DESCRIPTION}</DefaultText>} icon={<Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_4_NUMBER} color='primary' />}>
                                                <DefaultText>
                                                    <BoldSpan>{Resources.REWARD_DETAIL_OPERATION_STEP_4_TITLE}</BoldSpan>
                                                </DefaultText>
                                            </StepLabel>
                                        </Step>
                                    </Stepper>
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
