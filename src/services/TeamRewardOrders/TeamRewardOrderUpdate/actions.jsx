import * as types from './actionTypes';

export const updateTeamRewardOrder = (id, oldPointBalance, isValid) => ({
  type: types.UPDATE_TEAM_REWARD_ORDER,
  id,
  oldPointBalance,
  isValid,
});

export const updateTeamRewardOrderSuccess = () => ({
  type: types.UPDATE_TEAM_REWARD_ORDER_SUCCESS,
});

export const updateTeamRewardOrderError = () => ({
  type: types.UPDATE_TEAM_REWARD_ORDER_ERROR,
});

export const clearTeamRewardOrderUpdate = () => ({
  type: types.CLEAR_TEAM_REWARD_ORDER_UPDATE,
});
