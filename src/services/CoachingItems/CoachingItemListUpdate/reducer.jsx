import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CoachingItemListUpdate = (
  state = initialState.coachingItemListUpdate,
  action,
) => {
  switch (action.type) {
    case types.UPDATE_COACHING_ITEM_LIST:
      return { ...state, success: false, loading: true, hasError: false };

    case types.UPDATE_COACHING_ITEM_LIST_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.UPDATE_COACHING_ITEM_LIST_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.UPDATE_COACHING_ITEM_LIST_CLEAR:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default CoachingItemListUpdate;
