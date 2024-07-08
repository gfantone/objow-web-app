import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamChallengeRankList = (
  state = initialState.teamChallengeRankList,
  action,
) => {
  switch (action.type) {
    case types.GET_TEAM_CHALLENGE_RANK_LIST:
    case types.GET_TEAM_CHALLENGE_RANK_LIST_BY_TEAM_GROUP:
      return { ...state, ranks: null, loading: true, hasError: false };

    case types.GET_TEAM_CHALLENGE_RANK_LIST_SUCCESS:
      return { ...state, ranks: action.ranks, loading: false, hasError: false };

    case types.GET_TEAM_CHALLENGE_RANK_LIST_ERROR:
      return { ...state, ranks: null, loading: false, hasError: true };

    case types.GET_TEAM_CHALLENGE_RANK_LIST_CLEAR:
      return { ...state, ranks: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default TeamChallengeRankList;
