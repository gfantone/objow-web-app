import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let GoalListImport = (state = initialState.goalListImport, action) => {
  switch (action.type) {
    case types.IMPORT_GOAL_LIST:
      return { ...state, success: false, loading: true, error: null };

    case types.IMPORT_GOAL_LIST_SUCCESS:
      return { ...state, success: true, loading: false, error: null };

    case types.IMPORT_GOAL_LIST_ERROR:
      return { ...state, success: false, loading: false, error: action.error };

    case types.CLEAR_GOAL_LIST_IMPORT:
      return { ...state, success: false, loading: false, error: null };

    default:
      return state;
  }
};

export default GoalListImport;
