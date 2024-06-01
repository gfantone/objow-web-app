import * as types from './actionTypes';

export const updateTeamGoalList = (goals) => {
  return {
    type: types.UPDATE_TEAM_GOAL_LIST,
    goals,
  };
};

export const updateTeamGoalListSuccess = () => {
  return {
    type: types.UPDATE_TEAM_GOAL_LIST_SUCCESS,
  };
};

export const updateTeamGoalListError = () => {
  return {
    type: types.UPDATE_TEAM_GOAL_LIST_ERROR,
  };
};

export const updateTeamGoalListClear = () => {
  return {
    type: types.UPDATE_TEAM_GOAL_LIST_CLEAR,
  };
};
