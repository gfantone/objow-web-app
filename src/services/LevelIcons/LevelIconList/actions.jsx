import * as types from './actionTypes';

export const getUsableList = () => ({
  type: types.GET_LEVELS_USABLE_LIST,
});

export const getUsableListForLevel = (levelId) => ({
  type: types.GET_USABLE_LIST_FOR_LEVEL,
  levelId,
});

export const getLevelIconListSuccess = (icons) => ({
  type: types.GET_LEVEL_ICON_LIST_SUCCESS,
  icons,
});

export const getLevelIconListError = () => ({
  type: types.GET_LEVEL_ICON_LIST_ERROR,
});
