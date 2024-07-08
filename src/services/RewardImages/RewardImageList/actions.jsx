import * as types from './actionTypes';

export const getRewardImageList = () => ({
  type: types.GET_REWARD_IMAGE_LIST,
});

export const getRewardImageListSuccess = (images) => ({
  type: types.GET_REWARD_IMAGE_LIST_SUCCESS,
  images,
});

export const getRewardImageListError = () => ({
  type: types.GET_REWARD_IMAGE_LIST_ERROR,
});
