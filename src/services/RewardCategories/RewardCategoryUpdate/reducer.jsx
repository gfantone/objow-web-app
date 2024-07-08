import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const RewardCategoryUpdate = (
  state = initialState.rewardCategoryUpdate,
  action,
) => {
  switch (action.type) {
    case types.UPDATE_REWARD_CATEGORY:
    case types.UPDATE_REWARD_CATEGORY_ACTIVATION:
      return { ...state, success: false, loading: true, hasError: false };

    case types.UPDATE_REWARD_CATEGORY_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.UPDATE_REWARD_CATEGORY_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_REWARD_CATEGORY_UPDATE:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default RewardCategoryUpdate;
