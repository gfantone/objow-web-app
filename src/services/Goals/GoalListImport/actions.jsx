import * as types from './actionTypes';

export const importGoalList = (request) => ({
  type: types.IMPORT_GOAL_LIST,
  request,
});

export const importGoalListSuccess = () => ({
  type: types.IMPORT_GOAL_LIST_SUCCESS,
});

export const importGoalListError = (error) => ({
  type: types.IMPORT_GOAL_LIST_ERROR,
  error,
});

export const clearGoalListImport = () => ({
  type: types.CLEAR_GOAL_LIST_IMPORT,
});
