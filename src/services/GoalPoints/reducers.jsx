import * as types from './actionTypes';
import initialState from '../../store/initialState';

let GoalPoints = (state = initialState.goalPoints, action) => {
  switch (action.type) {
    case types.GET_GOAL_POINTS:
      return { ...state, points: [], loading: true, hasError: false };

    case types.GET_GOAL_POINTS_SUCCESS:
      return {
        ...state,
        points: action.points,
        loading: false,
        hasError: false,
      };

    case types.GET_GOAL_POINTS_ERROR:
      return { ...state, points: [], loading: false, hasError: true };

    default:
      return state;
  }
};

export default GoalPoints;
