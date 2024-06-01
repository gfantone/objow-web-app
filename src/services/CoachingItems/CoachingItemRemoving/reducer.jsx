import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CoachingItemRemoving = (
  state = initialState.coachingItemRemoving,
  action,
) => {
  switch (action.type) {
    case types.REMOVE_COACHING_ITEM:
      return { ...state, success: false, loading: true, hasError: false };

    case types.REMOVE_COACHING_ITEM_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.REMOVE_COACHING_ITEM_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    default:
      return state;
  }
};

export default CoachingItemRemoving;
