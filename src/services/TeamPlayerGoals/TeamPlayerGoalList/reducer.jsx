import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamPlayerGoalList = (state = initialState.teamPlayerGoalList, action) => {
  switch (action.type) {
    case types.GET_TEAM_PLAYER_GOAL_LIST:
      return { ...state, goals: [], loading: true, hasError: false };

    case types.GET_TEAM_PLAYER_GOAL_LIST_SUCCESS:
      return { ...state, goals: action.goals, loading: false, hasError: false };

    case types.GET_TEAM_PLAYER_GOAL_LIST_ERROR:
      return { ...state, goals: [], loading: false, hasError: true };

    default:
      return state;
  }
};

export default TeamPlayerGoalList;
