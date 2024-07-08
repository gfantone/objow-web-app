import * as types from './actionTypes';

export const getCollaboratorBadgeLevelList = (
  collaboratorId,
  year,
  category,
) => {
  return {
    type: types.GET_COLLABORATOR_BADGE_LEVEL_LIST,
    collaboratorId,
    year,
    category,
  };
};

export const getCollaboratorNextBadgeLevelList = (
  collaboratorId,
  year,
  category,
) => {
  return {
    type: types.GET_COLLABORATOR_NEXT_BADGE_LEVEL_LIST,
    collaboratorId,
    year,
    category,
  };
};

export const getCollaboratorBadgeLevelListSuccess = (levels) => {
  return {
    type: types.GET_COLLABORATOR_BADGE_LEVEL_LIST_SUCCESS,
    levels,
  };
};

export const getCollaboratorBadgeLevelListError = () => {
  return {
    type: types.GET_COLLABORATOR_BADGE_LEVEL_LIST_ERROR,
  };
};
