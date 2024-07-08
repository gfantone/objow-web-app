import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let UserGoalList = (state = initialState.userGoalList, action) => {
  switch (action.type) {
    case types.GET_USER_GOAL_LIST:
      return { ...state, loading: true, goals: [], hasError: false };

    case types.GET_USER_GOAL_LIST_SUCCESS:
      return { ...state, loading: false, goals: action.goals, hasError: false };

    case types.GET_USER_GOAL_LIST_ERROR:
      return { ...state, loading: false, goals: [], hasError: true };

    case types.CLEAR_USER_GOAL_LIST:
      return { ...state, loading: false, goals: [], hasError: false };

    default:
      return state;
  }
};

export default UserGoalList;
