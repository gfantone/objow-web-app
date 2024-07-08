import * as types from './actionTypes';

export const getValidatedTeamRewardOrderSummaryList = () => ({
  type: types.GET_VALIDATED_TEAM_REWARD_ORDER_SUMMARY_LIST,
});

export const getWaitingTeamRewardOrderSummaryList = () => ({
  type: types.GET_WAITING_TEAM_REWARD_ORDER_SUMMARY_LIST,
});

export const getTeamRewardOrderSummaryListSuccess = (orders) => ({
  type: types.GET_TEAM_REWARD_ORDER_SUMMARY_LIST_SUCCESS,
  orders,
});

export const getTeamRewardOrderSummaryListError = () => ({
  type: types.GET_TEAM_REWARD_ORDER_SUMMARY_LIST_ERROR,
});
