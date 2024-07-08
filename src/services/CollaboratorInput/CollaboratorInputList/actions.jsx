import * as types from './actionTypes';

export const getCollaboratorInputList = (kpiId, full, start, end, filters) => {
  return {
    type: types.GET_COLLABORATOR_INPUT_LIST,
    kpiId,
    full,
    start,
    end,
    filters,
  };
};

export const getCollaboratorInputListSuccess = (input) => {
  return {
    type: types.GET_COLLABORATOR_INPUT_LIST_SUCCESS,
    input,
  };
};

export const getCollaboratorInputListError = () => {
  return {
    type: types.GET_COLLABORATOR_INPUT_LIST_ERROR,
  };
};

export const getCollaboratorInputListClear = () => {
  return {
    type: types.GET_COLLABORATOR_INPUT_LIST_CLEAR,
  };
};
