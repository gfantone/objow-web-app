import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const TeamRewardOrderSummaryList = (
  state = initialState.teamRewardOrderSummaryList,
  action,
) => {
  switch (action.type) {
    case types.GET_VALIDATED_TEAM_REWARD_ORDER_SUMMARY_LIST:
    case types.GET_WAITING_TEAM_REWARD_ORDER_SUMMARY_LIST:
      return { ...state, orders: null, loading: true, hasError: false };

    case types.GET_TEAM_REWARD_ORDER_SUMMARY_LIST_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
        hasError: false,
      };

    case types.GET_TEAM_REWARD_ORDER_SUMMARY_LIST_ERROR:
      return { ...state, orders: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default TeamRewardOrderSummaryList;
