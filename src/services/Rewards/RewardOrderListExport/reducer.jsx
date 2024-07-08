import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const RewardOrderListExport = (
  state = initialState.rewardOrderListExport,
  action,
) => {
  switch (action.type) {
    case types.EXPORT_REWARD_ORDER_LIST:
      return { ...state, file: null, loading: true, hasError: false };

    case types.EXPORT_REWARD_ORDER_LIST_SUCCESS:
      return { ...state, file: action.file, loading: false, hasError: false };

    case types.EXPORT_REWARD_ORDER_LIST_ERROR:
      return { ...state, file: null, loading: false, hasError: true };

    case types.CLEAR_REWARD_ORDER_LIST_EXPORT:
      return { ...state, file: null, loading: false, hasError: false };

    default:
      return state;
  }
};

export default RewardOrderListExport;
