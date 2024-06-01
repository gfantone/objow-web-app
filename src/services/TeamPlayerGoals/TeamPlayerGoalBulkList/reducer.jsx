import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamPlayerGoalBulkList = (
  state = initialState.teamPlayerGoalList,
  action,
) => {
  switch (action.type) {
    case types.GET_TEAM_PLAYER_GOAL_BULK_LIST:
      return { ...state, goals: [], loading: true, hasError: false };

    case types.GET_TEAM_PLAYER_GOAL_BULK_LIST_SUCCESS:
      return { ...state, goals: action.goals, loading: false, hasError: false };

    case types.GET_TEAM_PLAYER_GOAL_BULK_LIST_ERROR:
      return { ...state, goals: [], loading: false, hasError: true };

    case types.GET_TEAM_PLAYER_GOAL_BULK_LIST_CLEAR:
      return { ...state, goals: null, loading: false, hasError: false };

    default:
      return state;
  }
};

export default TeamPlayerGoalBulkList;
