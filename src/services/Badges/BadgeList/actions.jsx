import * as types from './actionTypes';

export const getBadgeList = (periodId, options = {}) => {
  return {
    type: types.GET_BADGE_LIST,
    periodId,
    ...options,
  };
};

export const getBadgeListSuccess = (badges) => {
  return {
    type: types.GET_BADGE_LIST_SUCCESS,
    badges,
  };
};

export const getBadgeListError = () => {
  return {
    type: types.GET_BADGE_LIST_ERROR,
  };
};
