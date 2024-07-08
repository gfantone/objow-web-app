import * as types from './actionTypes';

export const getPlayerGoalList = (definitionId, date, team) => {
  return {
    type: types.GET_PLAYER_GOAL_LIST,
    definitionId,
    date,
    team,
  };
};

export const getPlayerGoalListSuccess = (goals) => {
  return {
    type: types.GET_PLAYER_GOAL_LIST_SUCCESS,
    goals,
  };
};

export const getPlayerGoalListError = () => {
  return {
    type: types.GET_PLAYER_GOAL_LIST_ERROR,
  };
};
