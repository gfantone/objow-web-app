import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const BadgeIconList = (state = initialState.badgeIconList, action) => {
  switch (action.type) {
    case types.GET_USABLE_LIST:
    case types.GET_USABLE_LIST_FOR_BADGE:
      return { ...state, icons: null, loading: true, hasError: false };

    case types.GET_BADGE_ICON_LIST_SUCCESS:
      return { ...state, icons: action.icons, loading: false, hasError: false };

    case types.GET_BADGE_ICON_LIST_ERROR:
      return { ...state, icons: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default BadgeIconList;
