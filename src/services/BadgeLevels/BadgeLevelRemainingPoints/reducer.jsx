import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let BadgeLevelRemainingPoints = (
  state = initialState.badgeLevelRemainingPoints,
  action,
) => {
  switch (action.type) {
    case types.GET_BADGE_LEVEL_REMAINING_POINTS:
      return { ...state, points: null, loading: true, hasError: false };

    case types.GET_BADGE_LEVEL_REMAINING_POINTS_SUCCESS:
      return {
        ...state,
        points: action.points,
        loading: false,
        hasError: false,
      };

    case types.GET_BADGE_LEVEL_REMAINING_POINTS_ERROR:
      return { ...state, points: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default BadgeLevelRemainingPoints;
