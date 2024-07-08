import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const CollaboratorRewardOrderCount = (
  state = initialState.collaboratorRewardOrderCount,
  action,
) => {
  switch (action.type) {
    case types.COUNT_WAITING_COLLABORATOR_REWARD_ORDER:
      return { ...state, loading: true, hasError: false };

    case types.COUNT_COLLABORATOR_REWARD_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
        hasError: false,
      };

    case types.COUNT_COLLABORATOR_REWARD_ORDER_ERROR:
      return { ...state, orders: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default CollaboratorRewardOrderCount;
