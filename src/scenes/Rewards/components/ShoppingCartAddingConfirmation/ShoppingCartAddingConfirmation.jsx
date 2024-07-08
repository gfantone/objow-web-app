import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CardMedia, Grid } from '@material-ui/core';
import {
  BoldSpan,
  Button,
  DefaultText,
  Dialog,
  DialogActions,
  DialogContent,
} from '../../../../components';
import { useIntl } from 'react-intl';
import * as Resources from '../../../../Resources';
import * as shoppingCartActions from '../../../../services/ShoppingCart/actions';

const ShoppingCartAddingConfirmation = ({ ...props }) => {
  const intl = useIntl();
  const { lastItem } = props.shoppingCart;

  function handleShoppingCartClick() {
    props.shoppingCartActions.clearLastItem();
    props.history.push('/rewards/shopping-cart');
  }

  function handleCloseClick() {
    props.shoppingCartActions.clearLastItem();
  }

  return (
    <div>
      <Dialog open={lastItem}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DefaultText>
                {intl.formatMessage({
                  id: 'reward.shopping_cart.adding_confirmation_message',
                })}
              </DefaultText>
              <DefaultText>
                <BoldSpan>{lastItem ? lastItem.reward.name : ''}</BoldSpan>
              </DefaultText>
            </Grid>
            <Grid item xs={12}>
              <CardMedia
                image={
                  lastItem
                    ? lastItem.reward.customImage
                      ? lastItem.reward.customImage
                      : lastItem.reward.image.path
                    : ''
                }
                style={{ height: 200 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2} justify="flex-end">
            <Grid item>
              <Button onClick={handleShoppingCartClick}>
                {intl.formatMessage({
                  id: 'reward.shopping_cart.adding_confirmation_shopping_cart_button',
                })}
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleCloseClick}>
                {intl.formatMessage({
                  id: 'reward.shopping_cart.adding_confirmation_close_button',
                })}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ shoppingCart }) => ({
  shoppingCart,
});

const mapDispatchToProps = (dispatch) => ({
  shoppingCartActions: bindActionCreators(shoppingCartActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ShoppingCartAddingConfirmation));
