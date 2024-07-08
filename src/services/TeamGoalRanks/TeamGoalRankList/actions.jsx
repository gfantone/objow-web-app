import * as types from './actionTypes';

export const getTeamGoalRankList = (goalId, page) => {
  return {
    type: types.GET_TEAM_GOAL_RANK_LIST,
    goalId,
    page,
  };
};

export const getTeamGoalRankListSuccess = (ranks) => {
  return {
    type: types.GET_TEAM_GOAL_RANK_LIST_SUCCESS,
    ranks,
  };
};

export const getTeamGoalRankListError = () => {
  return {
    type: types.GET_TEAM_GOAL_RANK_LIST_ERROR,
  };
};
