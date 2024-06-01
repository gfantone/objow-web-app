import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CoachingItemUpdate = (state = initialState.coachingItemUpdate, action) => {
  switch (action.type) {
    case types.UPDATE_COACHING_ITEM:
      return { ...state, success: false, loading: true, hasError: false };

    case types.UPDATE_COACHING_ITEM_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.UPDATE_COACHING_ITEM_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    default:
      return state;
  }
};

export default CoachingItemUpdate;
