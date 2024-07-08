import * as types from './actionTypes';

export const getPeriodList = () => {
  return {
    type: types.GET_PERIOD_LIST,
  };
};

export const getPeriodListSuccess = (periods) => {
  return {
    type: types.GET_PERIOD_LIST_SUCCESS,
    periods,
  };
};

export const getPeriodListError = () => {
  return {
    type: types.GET_PERIOD_LIST_ERROR,
  };
};
