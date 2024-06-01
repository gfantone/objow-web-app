import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const WeekOverlapCreation = (
  state = initialState.weekOverlapCreation,
  action,
) => {
  switch (action.type) {
    case types.CREATE_WEEK_OVERLAP:
      return { ...state, success: false, loading: true, hasError: false };

    case types.CREATE_WEEK_OVERLAP_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.CREATE_WEEK_OVERLAP_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_WEEK_OVERLAP_CREATION:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default WeekOverlapCreation;
