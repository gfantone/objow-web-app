import * as types from './actionTypes';

export const getUsableList = () => ({
  type: types.GET_USABLE_LIST,
});

export const getUsableListForBadge = (badgeId) => ({
  type: types.GET_USABLE_LIST_FOR_BADGE,
  badgeId,
});

export const getBadgeIconListSuccess = (icons) => ({
  type: types.GET_BADGE_ICON_LIST_SUCCESS,
  icons,
});

export const getBadgeIconListError = () => ({
  type: types.GET_BADGE_ICON_LIST_ERROR,
});
