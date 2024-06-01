import * as types from './actionTypes';

export const getImportLogList = () => {
  return {
    type: types.GET_IMPORT_LOG_LIST,
  };
};

export const getImportLogListSuccess = (logs) => {
  return {
    type: types.GET_IMPORT_LOG_LIST_SUCCESS,
    logs,
  };
};

export const getImportLogListError = () => {
  return {
    type: types.GET_IMPORT_LOG_LIST_ERROR,
  };
};
