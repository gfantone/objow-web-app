import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let BadgeLevelListRemoving = (
  state = initialState.badgeLevelListRemoving,
  action,
) => {
  switch (action.type) {
    case types.REMOVE_BADGE_LEVEL_LIST:
      return { ...state, success: false, loading: true, hasError: false };

    case types.REMOVE_BADGE_LEVEL_LIST_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.REMOVE_BADGE_LEVEL_LIST_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_BADGE_LEVEL_LIST_REMOVING:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default BadgeLevelListRemoving;
