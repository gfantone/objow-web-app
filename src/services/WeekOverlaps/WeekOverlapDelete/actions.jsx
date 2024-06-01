import * as types from './actionTypes';

export const deleteWeekOverlap = (weekOverlapId) => {
  return {
    type: types.DELETE_WEEK_OVERLAP,
    weekOverlapId,
  };
};

export const deleteWeekOverlapSuccess = () => {
  return {
    type: types.DELETE_WEEK_OVERLAP_SUCCESS,
  };
};

export const deleteWeekOverlapError = () => {
  return {
    type: types.DELETE_WEEK_OVERLAP_ERROR,
  };
};

export const clearWeekOverlapDelete = () => {
  return {
    type: types.CLEAR_WEEK_OVERLAP_DELETE,
  };
};
