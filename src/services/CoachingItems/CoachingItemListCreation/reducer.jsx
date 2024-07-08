import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CoachingItemListCreation = (
  state = initialState.coachingItemListCreation,
  action,
) => {
  switch (action.type) {
    case types.CREATE_COACHING_ITEM_LIST:
      return { ...state, success: false, loading: true, hasError: false };

    case types.CREATE_COACHING_ITEM_LIST_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        hasError: false,
        items: action.items,
      };

    case types.CREATE_COACHING_ITEM_LIST_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CREATE_COACHING_ITEM_LIST_CLEAR:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default CoachingItemListCreation;
