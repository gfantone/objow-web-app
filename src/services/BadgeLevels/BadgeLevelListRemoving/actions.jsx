import * as types from './actionTypes';

export const removeBadgeLevelList = (ids) => ({
  type: types.REMOVE_BADGE_LEVEL_LIST,
  ids,
});

export const removeBadgeLevelListSuccess = () => ({
  type: types.REMOVE_BADGE_LEVEL_LIST_SUCCESS,
});

export const removeBadgeLevelListError = () => ({
  type: types.REMOVE_BADGE_LEVEL_LIST_ERROR,
});

export const clearBadgeLevelListRemoving = () => ({
  type: types.CLEAR_BADGE_LEVEL_LIST_REMOVING,
});
