import * as types from './actionTypes';

export const getImportUsersLogList = () => {
  return {
    type: types.GET_IMPORT_USERS_LOG_LIST,
  };
};

export const getImportUsersLogListSuccess = (logs) => {
  return {
    type: types.GET_IMPORT_USERS_LOG_LIST_SUCCESS,
    logs,
  };
};

export const getImportUsersLogListError = () => {
  return {
    type: types.GET_IMPORT_USERS_LOG_LIST_ERROR,
  };
};
