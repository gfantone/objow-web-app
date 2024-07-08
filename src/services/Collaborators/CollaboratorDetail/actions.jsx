import * as types from './actionTypes';

export const getCollaboratorDetail = (id, year, options) => {
  return {
    type: types.GET_COLLABORATOR_DETAIL,
    id,
    year,
    options,
  };
};

export const getCollaboratorDetailSuccess = (collaborator) => {
  return {
    type: types.GET_COLLABORATOR_DETAIL_SUCCESS,
    collaborator,
  };
};

export const getCollaboratorDetailError = () => {
  return {
    type: types.GET_COLLABORATOR_DETAIL_ERROR,
  };
};
