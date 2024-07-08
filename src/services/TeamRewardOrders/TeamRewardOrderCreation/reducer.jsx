import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const TeamRewardOrderCreation = (
  state = initialState.teamRewardOrderCreation,
  action,
) => {
  switch (action.type) {
    case types.CREATE_TEAM_REWARD_ORDER:
      return { ...state, success: false, loading: true, hasError: false };

    case types.CREATE_TEAM_REWARD_ORDER_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.CREATE_TEAM_REWARD_ORDER_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_TEAM_REWARD_ORDER_CREATION:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default TeamRewardOrderCreation;
