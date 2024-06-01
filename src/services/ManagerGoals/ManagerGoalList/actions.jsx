import * as types from './actionTypes';

export const getManagerGoalList = (id, current, category) => {
  return {
    type: types.GET_MANAGER_GOAL_LIST,
    id,
    current,
    category,
  };
};

export const getManagerGoalListSuccess = (goals) => {
  return {
    type: types.GET_MANAGER_GOAL_LIST_SUCCESS,
    goals,
  };
};

export const getManagerGoalListError = () => {
  return {
    type: types.GET_MANAGER_GOAL_LIST_ERROR,
  };
};
