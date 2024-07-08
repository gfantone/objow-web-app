import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CollaboratorChallengeGeneralRankDetail = (
  state = initialState.collaboratorChallengeGeneralRankDetail,
  action,
) => {
  switch (action.type) {
    case types.GET_COLLABORATOR_CHALLENGE_GENERAL_RANK_DETAIL:
      return { ...state, rank: null, loading: true, hasError: false };

    case types.GET_COLLABORATOR_CHALLENGE_GENERAL_RANK_DETAIL_SUCCESS:
      return { ...state, rank: action.rank, loading: false, hasError: false };

    case types.GET_COLLABORATOR_CHALLENGE_GENERAL_RANK_DETAIL_ERROR:
      return { ...state, rank: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default CollaboratorChallengeGeneralRankDetail;
