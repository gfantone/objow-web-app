import * as actionTypes from './actionTypes';

export const getGoalTypeList = () => {
  return {
    type: actionTypes.GET_GOAL_TYPE_LIST,
  };
};

export const getGoalTypeListSuccess = (types) => {
  return {
    type: actionTypes.GET_GOAL_TYPE_LIST_SUCCESS,
    types,
  };
};

export const getGoalTypeListError = () => {
  return {
    type: actionTypes.GET_GOAL_TYPE_LIST_ERROR,
  };
};
