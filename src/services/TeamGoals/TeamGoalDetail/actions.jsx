import * as types from './actionTypes';

export const getTeamGoalDetail = (id) => {
  return {
    type: types.GET_TEAM_GOAL_DETAIL,
    id,
  };
};

export const getTeamGoalDetailSuccess = (goal) => {
  return {
    type: types.GET_TEAM_GOAL_DETAIL_SUCCESS,
    goal,
  };
};

export const getTeamGoalDetailError = () => {
  return {
    type: types.GET_TEAM_GOAL_DETAIL_ERROR,
  };
};
