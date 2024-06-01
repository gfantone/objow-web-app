import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamRemoving = (state = initialState.teamRemoving, action) => {
  switch (action.type) {
    case types.REMOVE_TEAM:
      return { ...state, success: false, loading: true, hasError: false };

    case types.REMOVE_TEAM_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.REMOVE_TEAM_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_TEAM_REMOVING:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default TeamRemoving;
