import * as types from './actionTypes';

export const getCollaboratorRewardOrder = (id, withPointSummary = false) => ({
  type: types.GET_COLLABORATOR_REWARD_ORDER,
  id,
  withPointSummary,
});

export const getCollaboratorRewardOrderSuccess = (order) => ({
  type: types.GET_COLLABORATOR_REWARD_ORDER_SUCCESS,
  order,
});

export const getCollaboratorRewardOrderError = () => ({
  type: types.GET_COLLABORATOR_REWARD_ORDER_ERROR,
});

export const clearCollaboratorRewardOrderDetail = () => ({
  type: types.CLEAR_COLLABORATOR_REWARD_ORDER_DETAIL,
});
