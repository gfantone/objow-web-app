import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamGroupCreation = (state = initialState.teamGroupCreation, action) => {
  switch (action.type) {
    case types.CREATE_TEAM_GROUP:
      return { ...state, success: false, loading: true, hasError: false };

    case types.CREATE_TEAM_GROUP_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.CREATE_TEAM_GROUP_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_TEAM_GROUP_CREATION:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default TeamGroupCreation;
