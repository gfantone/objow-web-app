import * as types from './actionTypes';

export const resetUserPasswordConfirm = (
  code,
  reset_token,
  password,
  force,
) => {
  return {
    type: types.RESET_USER_PASSWORD_CONFIRM,
    code,
    reset_token,
    password,
    force,
  };
};

export const resetUserPasswordConfirmSuccess = () => {
  return {
    type: types.RESET_USER_PASSWORD_CONFIRM_SUCCESS,
  };
};

export const resetUserPasswordConfirmError = (error) => {
  return {
    type: types.RESET_USER_PASSWORD_CONFIRM_ERROR,
    error,
  };
};
