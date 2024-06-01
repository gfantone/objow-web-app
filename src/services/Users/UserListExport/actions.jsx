import * as types from './actionTypes';

export const exportUserList = (request) => ({
  type: types.EXPORT_USER_LIST,
  request,
});

export const exportUserListSuccess = () => ({
  type: types.EXPORT_USER_LIST_SUCCESS,
});

export const exportUserListError = (error) => ({
  type: types.EXPORT_USER_LIST_ERROR,
  error,
});

export const clearUserListExport = () => ({
  type: types.CLEAR_USER_LIST_EXPORT,
});
