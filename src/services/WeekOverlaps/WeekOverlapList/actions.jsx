import * as types from './actionTypes';

export const getWeekOverlapList = () => {
  return {
    type: types.GET_WEEK_OVERLAP_LIST,
  };
};

export const getWeekOverlapListSuccess = (overlaps) => {
  return {
    type: types.GET_WEEK_OVERLAP_LIST_SUCCESS,
    overlaps,
  };
};

export const getWeekOverlapListError = () => {
  return {
    type: types.GET_WEEK_OVERLAP_LIST_ERROR,
  };
};
