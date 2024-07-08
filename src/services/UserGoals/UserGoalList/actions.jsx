import * as types from './actionTypes';

export const getUserGoalList = (inProgress, team, category, date) => {
  return {
    type: types.GET_USER_GOAL_LIST,
    inProgress,
    team,
    category,
    date,
  };
};

export const getUserGoalListSuccess = (goals) => {
  return {
    type: types.GET_USER_GOAL_LIST_SUCCESS,
    goals,
  };
};

export const getUserGoalListError = () => {
  return {
    type: types.GET_USER_GOAL_LIST_ERROR,
  };
};

export const clearUserGoalList = () => {
  return {
    type: types.CLEAR_USER_GOAL_LIST,
  };
};
