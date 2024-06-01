import * as types from './actionTypes';

export const getRewardCategory = (id) => ({
  type: types.GET_REWARD_CATEGORY,
  id,
});

export const getRewardCategorySuccess = (category) => ({
  type: types.GET_REWARD_CATEGORY_SUCCESS,
  category,
});

export const getRewardCategoryError = () => ({
  type: types.GET_REWARD_CATEGORY_ERROR,
});
