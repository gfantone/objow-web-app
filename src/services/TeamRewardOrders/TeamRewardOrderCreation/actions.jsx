import * as types from './actionTypes';

export const createTeamRewardOrder = (order, items) => ({
  type: types.CREATE_TEAM_REWARD_ORDER,
  order,
  items,
});

export const createTeamRewardOrderSuccess = () => ({
  type: types.CREATE_TEAM_REWARD_ORDER_SUCCESS,
});

export const createTeamRewardOrderError = () => ({
  type: types.CREATE_TEAM_REWARD_ORDER_ERROR,
});

export const clearTeamRewardOrderCreation = () => ({
  type: types.CLEAR_TEAM_REWARD_ORDER_CREATION,
});
