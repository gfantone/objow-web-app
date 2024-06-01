import * as types from './actionTypes';

export const getCollaboratorGoalDetail = (id) => {
  return {
    type: types.GET_COLLABORATOR_GOAL_DETAIL,
    id,
  };
};

export const getCollaboratorGoalDetailSuccess = (goal) => {
  return {
    type: types.GET_COLLABORATOR_GOAL_DETAIL_SUCCESS,
    goal,
  };
};

export const getCollaboratorGoalDetailError = () => {
  return {
    type: types.GET_COLLABORATOR_GOAL_DETAIL_ERROR,
  };
};
