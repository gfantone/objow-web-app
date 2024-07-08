import * as types from './actionTypes';

export const getNextPeriodList = () => {
  return {
    type: types.GET_NEXT_PERIOD_LIST,
  };
};

export const getNextPeriodListSuccess = (periods) => {
  return {
    type: types.GET_NEXT_PERIOD_LIST_SUCCESS,
    periods,
  };
};

export const getNextPeriodListError = () => {
  return {
    type: types.GET_NEXT_PERIOD_LIST_ERROR,
  };
};
