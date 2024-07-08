import * as types from './actionTypes';

export const getUserDetail = (id) => {
  return {
    type: types.GET_USER_DETAIL,
    id,
  };
};

export const getUserDetailSuccess = (user) => {
  return {
    type: types.GET_USER_DETAIL_SUCCESS,
    user,
  };
};

export const getUserDetailError = () => {
  return {
    type: types.GET_USER_DETAIL_ERROR,
  };
};
