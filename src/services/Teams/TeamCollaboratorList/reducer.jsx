import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamCollaboratorList = (
  state = initialState.teamCollaboratorList,
  action
) => {
  switch (action.type) {
    case types.GET_TEAM_COLLABORATOR_LIST:
      return { ...state, collaborators: [], loading: true, hasError: false };

    case types.GET_TEAM_COLLABORATOR_LIST_SUCCESS:
      return {
        ...state,
        collaborators: action.collaborators,
        loading: false,
        hasError: false,
      };

    case types.GET_TEAM_COLLABORATOR_LIST_ERROR:
      return { ...state, collaborators: [], loading: false, hasError: true };

    case types.GET_TEAM_COLLABORATOR_LIST_CLEAR:
      return { ...state, collaborators: [], loading: false, hasError: false };

    default:
      return state;
  }
};

export default TeamCollaboratorList;
