import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let WeekOverlapDelete = (state = initialState.weekOverlapDelete, action) => {
  switch (action.type) {
    case types.DELETE_WEEK_OVERLAP:
      return { ...state, success: false, loading: true, hasError: false };

    case types.DELETE_WEEK_OVERLAP_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.DELETE_WEEK_OVERLAP_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_WEEK_OVERLAP_DELETE:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default WeekOverlapDelete;
