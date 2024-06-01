import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamGoalDetail = (state = initialState.teamGoalDetail, action) => {
  switch (action.type) {
    case types.GET_TEAM_GOAL_DETAIL:
      return { ...state, goal: null, loading: true, hasError: false };

    case types.GET_TEAM_GOAL_DETAIL_SUCCESS:
      return { ...state, goal: action.goal, loading: false, hasError: false };

    case types.GET_TEAM_GOAL_DETAIL_ERROR:
      return { ...state, goal: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default TeamGoalDetail;
