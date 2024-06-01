import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge } from './components';
import { IconButton } from '../../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ShoppingCartButton = ({ style, ...props }) => {
  const { items } = props.shoppingCart;
  const nbItems =
    items.length > 0 ? items.map((x) => x.quantity).reduce((a, b) => a + b) : 0;

  function handleClick() {
    props.history.push('/rewards/shopping-cart');
  }

  return (
    <IconButton size="small" onClick={handleClick} style={style}>
      <Badge badgeContent={nbItems} color="secondary">
        <FontAwesomeIcon icon={faShoppingCart} />
      </Badge>
    </IconButton>
  );
};

const mapStateToProps = ({ shoppingCart }) => ({
  shoppingCart,
});

export default connect(mapStateToProps)(withRouter(ShoppingCartButton));
