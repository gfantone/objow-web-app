import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamGroupList = (state = initialState.teamGroupList, action) => {
  switch (action.type) {
    case types.GET_TEAM_GROUP_LIST:
      return { ...state, teamGroups: [], loading: true, hasError: false };

    case types.GET_TEAM_GROUP_LIST_SUCCESS:
      return {
        ...state,
        teamGroups: action.teamGroups,
        loading: false,
        hasError: false,
      };

    case types.GET_TEAM_GROUP_LIST_ERROR:
      return { ...state, teamGroups: [], loading: false, hasError: true };

    default:
      return state;
  }
};

export default TeamGroupList;
