import * as types from './actionTypes';

export const createRewardCategory = (category) => ({
  type: types.CREATE_REWARD_CATEGORY,
  category,
});

export const createRewardCategorySuccess = () => ({
  type: types.CREATE_REWARD_CATEGORY_SUCCESS,
});

export const createRewardCategoryError = () => ({
  type: types.CREATE_REWARD_CATEGORY_ERROR,
});

export const clearRewardCategoryCreation = () => ({
  type: types.CLEAR_REWARD_CATEGORY_CREATION,
});
