import * as types from './actionTypes';

export const createBadge = (badge) => {
  return {
    type: types.CREATE_BADGE,
    badge,
  };
};

export const createBadgeSuccess = () => {
  return {
    type: types.CREATE_BADGE_SUCCESS,
  };
};

export const createBadgeError = () => {
  return {
    type: types.CREATE_BADGE_ERROR,
  };
};

export const clearBadgeCreate = () => {
  return {
    type: types.CLEAR_BADGE_CREATE,
  };
};
