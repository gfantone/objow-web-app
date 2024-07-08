import * as types from './actionTypes';

export const getPlayerGoalBulkList = (definitionId, dates, teams) => {
  return {
    type: types.GET_PLAYER_GOAL_BULK_LIST,
    definitionId,
    dates,
    teams,
  };
};

export const getPlayerGoalBulkListSuccess = (goals) => {
  return {
    type: types.GET_PLAYER_GOAL_BULK_LIST_SUCCESS,
    goals,
  };
};

export const getPlayerGoalBulkListError = () => {
  return {
    type: types.GET_PLAYER_GOAL_BULK_LIST_ERROR,
  };
};

export const getPlayerGoalBulkListClear = () => {
  return {
    type: types.GET_PLAYER_GOAL_BULK_LIST_CLEAR,
  };
};
