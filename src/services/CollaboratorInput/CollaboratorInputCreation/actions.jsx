import * as types from './actionTypes';

export const createCollaboratorInput = (input) => {
  return {
    type: types.CREATE_COLLABORATOR_INPUT,
    input,
  };
};

export const createCollaboratorInputSuccess = (input) => {
  return {
    type: types.CREATE_COLLABORATOR_INPUT_SUCCESS,
    input,
  };
};

export const createCollaboratorInputError = () => {
  return {
    type: types.CREATE_COLLABORATOR_INPUT_ERROR,
  };
};

export const clearCollaboratorInputCreation = () => {
  return {
    type: types.CLEAR_COLLABORATOR_INPUT_CREATION,
  };
};
