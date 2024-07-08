import * as types from './actionTypes';

export const getTeamGeneralRankDetail = (teamId, year) => {
  return {
    type: types.GET_TEAM_GENERAL_RANK_DETAIL,
    teamId,
    year,
  };
};

export const getTeamGeneralRankDetailSuccess = (rank) => {
  return {
    type: types.GET_TEAM_GENERAL_RANK_DETAIL_SUCCESS,
    rank,
  };
};

export const getTeamGeneralRankDetailError = () => {
  return {
    type: types.GET_TEAM_GENERAL_RANK_DETAIL_ERROR,
  };
};
