import * as types from './actionTypes';

export const getCollaboratorGoalCategories = (id, year) => ({
  type: types.GET_COLLABORATOR_GOAL_CATEGORY_LIST,
  id,
  year,
});

export const getCollaboratorGoalCategoriesSuccess = (categories) => ({
  type: types.GET_COLLABORATOR_GOAL_CATEGORY_LIST_SUCCESS,
  categories,
});

export const getCollaboratorGoalCategoriesError = () => ({
  type: types.GET_COLLABORATOR_GOAL_CATEGORY_LIST_ERROR,
});
