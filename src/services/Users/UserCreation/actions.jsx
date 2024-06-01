import * as types from './actionTypes';

export const createUser = (user) => {
  return {
    type: types.CREATE_USER,
    user,
  };
};

export const createUserSuccess = () => {
  return {
    type: types.CREATE_USER_SUCCESS,
  };
};

export const createUserError = () => {
  return {
    type: types.CREATE_USER_ERROR,
  };
};

export const clearUserCreation = () => {
  return {
    type: types.CLEAR_USER_CREATION,
  };
};
