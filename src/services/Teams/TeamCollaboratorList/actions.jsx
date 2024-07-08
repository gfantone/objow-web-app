import * as types from './actionTypes';

export const getTeamCollaboratorList = (options) => {
  return {
    type: types.GET_TEAM_COLLABORATOR_LIST,
    ...options,
  };
};

export const getTeamCollaboratorListSuccess = (collaborators) => {
  return {
    type: types.GET_TEAM_COLLABORATOR_LIST_SUCCESS,
    collaborators,
  };
};

export const getTeamCollaboratorListError = () => {
  return {
    type: types.GET_TEAM_COLLABORATOR_LIST_ERROR,
  };
};

export const getTeamCollaboratorListClear = () => {
  return {
    type: types.GET_TEAM_COLLABORATOR_LIST_CLEAR,
  };
};
