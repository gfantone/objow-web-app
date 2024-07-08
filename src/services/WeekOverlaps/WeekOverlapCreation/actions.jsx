import * as types from './actionTypes';

export const createWeekOverlap = (weekOverlap) => {
  return {
    type: types.CREATE_WEEK_OVERLAP,
    weekOverlap,
  };
};

export const createWeekOverlapSuccess = () => {
  return {
    type: types.CREATE_WEEK_OVERLAP_SUCCESS,
  };
};

export const createWeekOverlapError = () => {
  return {
    type: types.CREATE_WEEK_OVERLAP_ERROR,
  };
};

export const clearWeekOverlapCreation = () => {
  return {
    type: types.CLEAR_WEEK_OVERLAP_CREATION,
  };
};
