import * as types from './actionTypes';

export const createReward = (reward) => ({
  type: types.CREATE_REWARD,
  reward,
});

export const createRewardSuccess = () => ({
  type: types.CREATE_REWARD_SUCCESS,
});

export const createRewardError = () => ({
  type: types.CREATE_REWARD_ERROR,
});

export const clearRewardCreation = () => ({
  type: types.CLEAR_REWARD_CREATION,
});
