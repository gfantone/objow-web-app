import * as types from './actionTypes';

export const updateBadgeLevelList = (levels) => {
  return {
    type: types.UPDATE_BADGE_LEVEL_LIST,
    levels,
  };
};

export const updateBadgeLevelListSuccess = () => {
  return {
    type: types.UPDATE_BADGE_LEVEL_LIST_SUCCESS,
  };
};

export const updateBadgeLevelListError = () => {
  return {
    type: types.UPDATE_BADGE_LEVEL_LIST_ERROR,
  };
};

export const clearBadgeLevelListUpdate = () => {
  return {
    type: types.CLEAR_BADGE_LEVEL_LIST_UPDATE,
  };
};
