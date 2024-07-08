import * as types from './actionTypes';

export const resetUserPassword = (code, email) => {
  return {
    type: types.RESET_USER_PASSWORD,
    code,
    email,
  };
};

export const resetUserPasswordSuccess = () => {
  return {
    type: types.RESET_USER_PASSWORD_SUCCESS,
  };
};

export const resetUserPasswordError = () => {
  return {
    type: types.RESET_USER_PASSWORD_ERROR,
  };
};
