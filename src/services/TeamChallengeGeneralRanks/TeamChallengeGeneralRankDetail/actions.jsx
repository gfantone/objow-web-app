import * as types from './actionTypes';

export const getTeamChallengeGeneralRankDetail = (teamId, year) => {
  return {
    type: types.GET_TEAM_CHALLENGE_GENERAL_RANK_DETAIL,
    teamId,
    year,
  };
};

export const getTeamChallengeGeneralRankDetailSuccess = (rank) => {
  return {
    type: types.GET_TEAM_CHALLENGE_GENERAL_RANK_DETAIL_SUCCESS,
    rank,
  };
};

export const getTeamChallengeGeneralRankDetailError = () => {
  return {
    type: types.GET_TEAM_CHALLENGE_GENERAL_RANK_DETAIL_ERROR,
  };
};
