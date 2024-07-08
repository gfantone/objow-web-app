import * as types from './actionTypes';

export const getCollaboratorCategoryRankListByCategory = (
  categoryId,
  periodId,
) => {
  return {
    type: types.GET_COLLABORATOR_CATEGORY_RANK_LIST_BY_CATEGORY,
    categoryId,
    periodId,
  };
};

export const getCollaboratorCategoryRankListByCollaborator = (
  collaboratorId,
  year,
) => {
  return {
    type: types.GET_COLLABORATOR_CATEGORY_RANK_LIST_BY_COLLABORATOR,
    collaboratorId,
    year,
  };
};

export const getCollaboratorCategoryRankListSuccess = (ranks) => {
  return {
    type: types.GET_COLLABORATOR_CATEGORY_RANK_LIST_SUCCESS,
    ranks,
  };
};

export const getCollaboratorCategoryRankListError = () => {
  return {
    type: types.GET_COLLABORATOR_CATEGORY_RANK_LIST_ERROR,
  };
};
