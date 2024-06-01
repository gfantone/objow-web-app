import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const RewardCreation = (state = initialState.rewardCreation, action) => {
  switch (action.type) {
    case types.CREATE_REWARD:
      return { ...state, success: false, loading: true, hasError: false };

    case types.CREATE_REWARD_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.CREATE_REWARD_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_REWARD_CREATION:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default RewardCreation;
