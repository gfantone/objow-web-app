import * as types from './actionTypes';

export const getImportGoalsLogList = () => {
  return {
    type: types.GET_IMPORT_GOALS_LOG_LIST,
  };
};

export const getImportGoalsLogListSuccess = (logs) => {
  return {
    type: types.GET_IMPORT_GOALS_LOG_LIST_SUCCESS,
    logs,
  };
};

export const getImportGoalsLogListError = () => {
  return {
    type: types.GET_IMPORT_GOALS_LOG_LIST_ERROR,
  };
};
