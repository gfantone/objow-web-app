import * as types from './actionTypes';
import initialState from '../../store/initialState';

const RoleList = (state = initialState.shoppingCart, action) => {
  function addItem() {
    const items = state.items;
    const index = items.findIndex((x) => x.reward.id === action.item.reward.id);
    if (index > -1) {
      const item = items[index];
      item.quantity += action.item.quantity;
      items[index] = item;
    } else {
      items.push(action.item);
    }
    return { ...state, items: items, lastItem: action.item };
  }

  function removeItem() {
    const items = state.items;
    const index = items.findIndex((x) => x.reward.id === action.item.reward.id);
    if (index > -1) items.splice(index, 1);

    return { ...state, items: items, lastItem: action.item };
  }

  function changeItem() {
    const items = state.items;
    const index = items.findIndex((x) => x.reward.id === action.reward.id);
    const hasQuantity = action.quantity > 0;
    const itemExists = index > -1;
    var lastItem = null;

    if (hasQuantity && itemExists) {
      const item = items[index];
      item.quantity = action.quantity;
      items[index] = item;
    } else if (hasQuantity && !itemExists) {
      lastItem = { reward: action.reward, quantity: action.quantity };
      items.push(lastItem);
    } else if (!hasQuantity && itemExists) {
      items.splice(index, 1);
    }

    return { ...state, items: items, lastItem: lastItem };
  }

  switch (action.type) {
    case types.ADD_TO_SHOPPING_CART:
      return addItem();

    case types.REMOVE_FROM_SHOPPING_CART:
      return removeItem();

    case types.CHANGE_SHOPPING_CART:
      return changeItem();

    case types.CLEAR_LAST_ITEM:
      return { ...state, lastItem: null };

    case types.CLEAR_SHOPPING_CART:
      return { ...state, items: [], lastItem: null };

    default:
      return state;
  }
};

export default RoleList;
