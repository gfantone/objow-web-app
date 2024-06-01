import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamGoalSummaryList = (
  state = initialState.teamGoalSummaryList,
  action,
) => {
  switch (action.type) {
    case types.GET_TEAM_GOAL_SUMMARY_LIST_BY_COLLABORATOR:
    case types.GET_TEAM_GOAL_SUMMARY_LIST_BY_DEFINITION_AND_COLLABORATOR:
    case types.GET_TEAM_GOAL_SUMMARY_LIST_BY_DEFINITION_AND_TEAM:
    case types.GET_TEAM_GOAL_SUMMARY_LIST_BY_TEAM:
      return { ...state, goals: null, loading: true, hasError: false };

    case types.GET_EMPTY_TEAM_GOAL_SUMMARY_LIST:
      return { ...state, goals: [], loading: false, hasError: false };

    case types.GET_TEAM_GOAL_SUMMARY_LIST_SUCCESS:
      return { ...state, goals: action.goals, loading: false, hasError: false };

    case types.GET_TEAM_GOAL_SUMMARY_LIST_ERROR:
      return { ...state, goals: null, loading: false, hasError: true };

    case types.CLEAR_TEAM_GOAL_SUMMARY_LIST:
      return { ...state, goals: null, loading: false, hasError: false };

    default:
      return state;
  }
};

export default TeamGoalSummaryList;
