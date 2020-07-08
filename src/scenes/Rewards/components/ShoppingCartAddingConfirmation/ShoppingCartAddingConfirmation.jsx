import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {CardMedia, Grid} from '@material-ui/core'
import {BoldSpan, Button, DefaultText, Dialog, DialogActions, DialogContent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as shoppingCartActions from '../../../../services/ShoppingCart/actions'

const ShoppingCartAddingConfirmation = ({...props}) => {
    const {lastItem} = props.shoppingCart

    function handleShoppingCartClick() {
        props.shoppingCartActions.clearLastItem()
        props.history.push('/rewards/shopping-cart')
    }

    function handleCloseClick() {
        props.shoppingCartActions.clearLastItem()
    }

    return (
        <div>
            <Dialog open={lastItem}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <DefaultText>{Resources.REWARD_SHOPPING_CART_ADDING_CONFIRMATION_MESSAGE}</DefaultText>
                            <DefaultText>
                                <BoldSpan>{lastItem ? lastItem.reward.name : ''}</BoldSpan>
                            </DefaultText>
                        </Grid>
                        <Grid item xs={12}>
                            <CardMedia image={lastItem ? lastItem.reward.image.path : ''} style={{height: 250}} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleShoppingCartClick}>{Resources.REWARD_SHOPPING_CART_ADDING_CONFIRMATION_SHOPPING_CART_BUTTON}</Button>
                    <Button onClick={handleCloseClick}>{Resources.REWARD_SHOPPING_CART_ADDING_CONFIRMATION_CLOSE_BUTTON}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = ({shoppingCart}) => ({
    shoppingCart
})

const mapDispatchToProps = (dispatch) => ({
    shoppingCartActions: bindActionCreators(shoppingCartActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShoppingCartAddingConfirmation))
