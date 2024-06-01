import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const CollaboratorGeneralRankList = (
  state = initialState.collaboratorGeneralRankList,
  action,
) => {
  switch (action.type) {
    case types.GET_COLLABORATOR_GENERAL_RANK_LIST:
      return { ...state, ranks: null, loading: true, hasError: false };

    case types.GET_COLLABORATOR_GENERAL_RANK_LIST_SUCCESS:
      return { ...state, ranks: action.ranks, loading: false, hasError: false };

    case types.GET_COLLABORATOR_GENERAL_RANK_LIST_ERROR:
      return { ...state, ranks: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default CollaboratorGeneralRankList;
