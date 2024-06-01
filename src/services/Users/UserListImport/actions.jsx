import * as types from './actionTypes';

export const importUserList = (request) => ({
  type: types.IMPORT_USER_LIST,
  request,
});

export const importUserListSuccess = () => ({
  type: types.IMPORT_USER_LIST_SUCCESS,
});

export const importUserListError = (error) => ({
  type: types.IMPORT_USER_LIST_ERROR,
  error,
});

export const clearUserListImport = () => ({
  type: types.CLEAR_USER_LIST_IMPORT,
});
