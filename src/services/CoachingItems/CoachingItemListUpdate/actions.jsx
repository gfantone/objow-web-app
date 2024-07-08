import * as types from './actionTypes';

export const updateCoachingItemList = (items) => {
  return {
    type: types.UPDATE_COACHING_ITEM_LIST,
    items,
  };
};

export const updateCoachingItemListSuccess = () => {
  return {
    type: types.UPDATE_COACHING_ITEM_LIST_SUCCESS,
  };
};

export const updateCoachingItemListError = () => {
  return {
    type: types.UPDATE_COACHING_ITEM_LIST_ERROR,
  };
};

export const updateCoachingItemListClear = () => {
  return {
    type: types.UPDATE_COACHING_ITEM_LIST_CLEAR,
  };
};
