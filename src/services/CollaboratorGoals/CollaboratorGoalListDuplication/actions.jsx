import * as types from './actionTypes';

export const duplicateCollaboratorGoalList = (source, destination) => ({
  type: types.DUPLICATE_COLLABORATOR_GOAL_LIST,
  source,
  destination,
});

export const duplicateCollaboratorGoalListSuccess = () => ({
  type: types.DUPLICATE_COLLABORATOR_GOAL_LIST_SUCCESS,
});

export const duplicateCollaboratorGoalListError = () => ({
  type: types.DUPLICATE_COLLABORATOR_GOAL_LIST_ERROR,
});

export const clearCollaboratorGoalListDuplication = () => ({
  type: types.CLEAR_COLLABORATOR_GOAL_LIST_DUPLICATION,
});
