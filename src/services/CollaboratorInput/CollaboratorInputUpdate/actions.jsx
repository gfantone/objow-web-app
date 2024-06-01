import * as types from './actionTypes';

export const updateCollaboratorInput = (data) => {
  return {
    type: types.UPDATE_COLLABORATOR_INPUT,
    data,
  };
};

export const updateCollaboratorInputSuccess = () => {
  return {
    type: types.UPDATE_COLLABORATOR_INPUT_SUCCESS,
  };
};

export const updateCollaboratorInputError = () => {
  return {
    type: types.UPDATE_COLLABORATOR_INPUT_ERROR,
  };
};

export const clearCollaboratorInputUpdate = () => {
  return {
    type: types.CLEAR_COLLABORATOR_INPUT_UPDATE,
  };
};
