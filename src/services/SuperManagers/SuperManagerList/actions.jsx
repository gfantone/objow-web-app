import * as types from './actionTypes';

export const getFreeSuperManagerList = () => {
  return {
    type: types.GET_FREE_SUPER_MANAGER_LIST,
  };
};

export const getSuperManagerListSuccess = (superManagers) => {
  return {
    type: types.GET_SUPER_MANAGER_LIST_SUCCESS,
    superManagers,
  };
};

export const getSuperManagerListError = () => {
  return {
    type: types.GET_SUPER_MANAGER_LIST_ERROR,
  };
};
