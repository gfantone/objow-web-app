import * as types from './actionTypes';

export const updateRewardCategory = (category) => ({
  type: types.UPDATE_REWARD_CATEGORY,
  category,
});

export const updateRewardCategoryActivation = (id, isActive) => ({
  type: types.UPDATE_REWARD_CATEGORY_ACTIVATION,
  id,
  isActive,
});

export const updateRewardCategorySuccess = () => ({
  type: types.UPDATE_REWARD_CATEGORY_SUCCESS,
});

export const updateRewardCategoryError = () => ({
  type: types.UPDATE_REWARD_CATEGORY_ERROR,
});

export const clearRewardCategoryUpdate = () => ({
  type: types.CLEAR_REWARD_CATEGORY_UPDATE,
});
