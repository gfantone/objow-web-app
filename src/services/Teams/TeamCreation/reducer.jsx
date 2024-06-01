import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamCreation = (state = initialState.teamCreation, action) => {
  switch (action.type) {
    case types.CREATE_TEAM:
      return { ...state, success: false, loading: true, hasError: false };

    case types.CREATE_TEAM_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.CREATE_TEAM_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_TEAM_CREATION:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default TeamCreation;
