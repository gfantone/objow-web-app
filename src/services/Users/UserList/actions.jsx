import * as types from "./actionTypes";

export const getUserList = (options) => {
  return {
    type: types.GET_USER_LIST,
    ...options,
  };
};

export const getUserListSuccess = (users, total, filtered_total) => {
  return {
    type: types.GET_USER_LIST_SUCCESS,
    users,
    total,
    filtered_total,
  };
};

export const getUserListError = () => {
  return {
    type: types.GET_USER_LIST_ERROR,
  };
};

export const getUserListClear = () => {
  return {
    type: types.GET_USER_LIST_CLEAR,
  };
};
