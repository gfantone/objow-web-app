import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamGroupBasedChallengeGoalList = (
  state = initialState.teamGroupBasedChallengeGoalList,
  action,
) => {
  switch (action.type) {
    case types.GET_TEAM_GROUP_BASED_CHALLENGE_GOAL_LIST:
    case types.GET_TEAM_GROUP_BASED_CHALLENGE_GOAL_LIST_BY_TEAM_GROUP:
      return { ...state, goals: null, loading: true, hasError: false };

    case types.GET_TEAM_GROUP_BASED_CHALLENGE_GOAL_LIST_SUCCESS:
      return { ...state, goals: action.goals, loading: false, hasError: false };

    case types.GET_TEAM_GROUP_BASED_CHALLENGE_GOAL_LIST_ERROR:
      return { ...state, goals: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default TeamGroupBasedChallengeGoalList;
