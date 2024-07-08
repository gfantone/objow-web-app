import * as types from './actionTypes';

export const getTeamChallengeGeneralRankList = (periodId) => {
  return {
    type: types.GET_TEAM_CHALLENGE_GENERAL_RANK_LIST,
    periodId,
  };
};

export const getTeamChallengeGeneralRankListSuccess = (ranks) => {
  return {
    type: types.GET_TEAM_CHALLENGE_GENERAL_RANK_LIST_SUCCESS,
    ranks,
  };
};

export const getTeamChallengeGeneralRankListError = () => {
  return {
    type: types.GET_TEAM_CHALLENGE_GENERAL_RANK_LIST_ERROR,
  };
};
