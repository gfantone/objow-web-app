import * as types from './actionTypes';

export const getBadgeDetail = (id) => {
  return {
    type: types.GET_BADGE_DETAIL,
    id,
  };
};

export const getBadgeDetailSuccess = (badge) => {
  return {
    type: types.GET_BADGE_DETAIL_SUCCESS,
    badge,
  };
};

export const getBadgeDetailError = () => {
  return {
    type: types.GET_BADGE_DETAIL_ERROR,
  };
};
