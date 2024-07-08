import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamGroupTree = (state = initialState.teamGroupTree, action) => {
  switch (action.type) {
    case types.GET_TEAM_GROUP_TREE:
      return { ...state, teamGroup: null, loading: true, hasError: false };

    case types.GET_TEAM_GROUP_TREE_SUCCESS:
      return {
        ...state,
        teamGroup: action.teamGroup,
        loading: false,
        hasError: false,
      };

    case types.GET_TEAM_GROUP_TREE_ERROR:
      return { ...state, teamGroup: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default TeamGroupTree;
