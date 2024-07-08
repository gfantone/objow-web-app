import * as types from './actionTypes';

export const getPeriodicityList = () => {
  return {
    type: types.GET_PERIODICITY_LIST,
  };
};

export const getPeriodicityListSuccess = (periodicities) => {
  return {
    type: types.GET_PERIODICITY_LIST_SUCCESS,
    periodicities,
  };
};

export const getPeriodicityListError = () => {
  return {
    type: types.GET_PERIODICITY_LIST_ERROR,
  };
};
