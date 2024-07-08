import * as types from './actionTypes';

export const getValidatedCollaboratorRewardOrderSummaryList = () => ({
  type: types.GET_VALIDATED_COLLABORATOR_REWARD_ORDER_SUMMARY_LIST,
});

export const getWaitingCollaboratorRewardOrderSummaryList = () => ({
  type: types.GET_WAITING_COLLABORATOR_REWARD_ORDER_SUMMARY_LIST,
});

export const getPendingCollaboratorRewardOrderSummaryList = () => ({
  type: types.GET_PENDING_COLLABORATOR_REWARD_ORDER_SUMMARY_LIST,
});

export const getCollaboratorRewardOrderSummaryListSuccess = (orders) => ({
  type: types.GET_COLLABORATOR_REWARD_ORDER_SUMMARY_LIST_SUCCESS,
  orders,
});

export const getCollaboratorRewardOrderSummaryListError = () => ({
  type: types.GET_COLLABORATOR_REWARD_ORDER_SUMMARY_LIST_ERROR,
});
