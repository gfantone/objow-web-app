import * as types from './actionTypes';

export const createCoachingItemList = (items) => {
  return {
    type: types.CREATE_COACHING_ITEM_LIST,
    items,
  };
};

export const createCoachingItemListSuccess = (items) => {
  return {
    type: types.CREATE_COACHING_ITEM_LIST_SUCCESS,
    items,
  };
};

export const createCoachingItemListError = () => {
  return {
    type: types.CREATE_COACHING_ITEM_LIST_ERROR,
  };
};

export const createCoachingItemListClear = () => {
  return {
    type: types.CREATE_COACHING_ITEM_LIST_CLEAR,
  };
};
