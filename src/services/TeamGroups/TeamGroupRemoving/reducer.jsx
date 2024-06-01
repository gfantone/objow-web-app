import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamGroupRemoving = (state = initialState.teamGroupRemoving, action) => {
  switch (action.type) {
    case types.REMOVE_TEAM_GROUP:
      return { ...state, success: false, loading: true, hasError: false };

    case types.REMOVE_TEAM_GROUP_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.REMOVE_TEAM_GROUP_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_TEAM_GROUP_REMOVING:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default TeamGroupRemoving;
