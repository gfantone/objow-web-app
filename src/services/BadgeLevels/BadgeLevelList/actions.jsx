import * as types from './actionTypes';

export const getBadgeLevelList = (badgeId) => {
  return {
    type: types.GET_BADGE_LEVEL_LIST,
    badgeId,
  };
};

export const getBadgeLevelListSuccess = (levels) => {
  return {
    type: types.GET_BADGE_LEVEL_LIST_SUCCESS,
    levels,
  };
};

export const getBadgeLevelListError = () => {
  return {
    type: types.GET_BADGE_LEVEL_LIST_ERROR,
  };
};
