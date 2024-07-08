import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamGoalBulkList = (state = initialState.teamGoalBulkList, action) => {
  switch (action.type) {
    case types.GET_TEAM_GOAL_BULK_LIST:
      return { ...state, goals: null, loading: true, hasError: false };

    case types.GET_TEAM_GOAL_BULK_LIST_SUCCESS:
      return { ...state, goals: action.goals, loading: false, hasError: false };

    case types.GET_TEAM_GOAL_BULK_LIST_ERROR:
      return { ...state, goals: null, loading: false, hasError: true };

    case types.GET_TEAM_GOAL_BULK_LIST_CLEAR:
      return { ...state, goals: null, loading: false, hasError: false };

    default:
      return state;
  }
};

export default TeamGoalBulkList;
