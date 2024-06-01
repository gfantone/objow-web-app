import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let WeekOverlapList = (state = initialState.weekOverlapList, action) => {
  switch (action.type) {
    case types.GET_WEEK_OVERLAP_LIST:
      return { ...state, overlaps: null, loading: true, hasError: false };

    case types.GET_WEEK_OVERLAP_LIST_SUCCESS:
      return {
        ...state,
        overlaps: action.overlaps,
        loading: false,
        hasError: false,
      };

    case types.GET_WEEK_OVERLAP_LIST_ERROR:
      return { ...state, overlaps: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default WeekOverlapList;
