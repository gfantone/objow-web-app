import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CoachingItemList = (state = initialState.coachingItemList, action) => {
  switch (action.type) {
    case types.GET_COACHING_ITEM_LIST:
      return { ...state, items: null, loading: true, hasError: false };

    case types.GET_COACHING_ITEM_LIST_SUCCESS:
      return { ...state, items: action.items, loading: false, hasError: false };

    case types.GET_COACHING_ITEM_LIST_ERROR:
      return { ...state, items: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default CoachingItemList;
