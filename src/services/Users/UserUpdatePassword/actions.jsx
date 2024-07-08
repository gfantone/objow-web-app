import * as types from './actionTypes';

export const updateUserPassword = (id, password, disableRedirect) => {
  return {
    type: types.UPDATE_USER_PASSWORD,
    id,
    password,
    disableRedirect,
  };
};

export const updateUserPasswordSuccess = () => {
  return {
    type: types.UPDATE_USER_PASSWORD_SUCCESS,
  };
};

export const updateUserPasswordError = () => {
  return {
    type: types.UPDATE_USER_PASSWORD_ERROR,
  };
};

export const updateUserPasswordClear = () => {
  return {
    type: types.UPDATE_USER_PASSWORD_CLEAR,
  };
};
