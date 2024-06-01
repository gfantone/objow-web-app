import * as types from './actionTypes';

export const getCollaboratorDataList = (kpiId, full, start, end, filters) => {
  return {
    type: types.GET_COLLABORATOR_DATA_LIST,
    kpiId,
    full,
    start,
    end,
    filters,
  };
};

export const getCollaboratorDataListSuccess = (data) => {
  return {
    type: types.GET_COLLABORATOR_DATA_LIST_SUCCESS,
    data,
  };
};

export const getCollaboratorDataListError = () => {
  return {
    type: types.GET_COLLABORATOR_DATA_LIST_ERROR,
  };
};

export const getCollaboratorDataListClear = () => {
  return {
    type: types.GET_COLLABORATOR_DATA_LIST_CLEAR,
  };
};
