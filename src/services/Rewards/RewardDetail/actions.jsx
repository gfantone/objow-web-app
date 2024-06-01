import * as types from './actionTypes';

export const getReward = (id) => ({
  type: types.GET_REWARD,
  id,
});

export const getRewardSuccess = (reward) => ({
  type: types.GET_REWARD_SUCCESS,
  reward,
});

export const getRewardError = () => ({
  type: types.GET_REWARD_ERROR,
});
