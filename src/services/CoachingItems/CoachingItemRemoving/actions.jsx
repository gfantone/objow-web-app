import * as types from './actionTypes';

export const removeCoachingItem = (id) => {
  return {
    type: types.REMOVE_COACHING_ITEM,
    id,
  };
};

export const removeCoachingItemSuccess = () => {
  return {
    type: types.REMOVE_COACHING_ITEM_SUCCESS,
  };
};

export const removeCoachingItemError = () => {
  return {
    type: types.REMOVE_COACHING_ITEM_ERROR,
  };
};
