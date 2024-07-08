import * as types from './actionTypes';

export const getTeamChallengeRankList = (
  challengeId,
  page,
  teamGroup,
  search,
) => {
  return {
    type: types.GET_TEAM_CHALLENGE_RANK_LIST,
    challengeId,
    page,
    teamGroup,
    search,
  };
};

export const getTeamChallengeRankListByTeamGroup = (
  challengeId,
  page,
  teamGroup,
  search,
) => {
  return {
    type: types.GET_TEAM_CHALLENGE_RANK_LIST_BY_TEAM_GROUP,
    challengeId,
    page,
    teamGroup,
    search,
  };
};

export const getTeamChallengeRankListSuccess = (ranks) => {
  return {
    type: types.GET_TEAM_CHALLENGE_RANK_LIST_SUCCESS,
    ranks,
  };
};

export const getTeamChallengeRankListError = () => {
  return {
    type: types.GET_TEAM_CHALLENGE_RANK_LIST_ERROR,
  };
};

export const getTeamChallengeRankListClear = () => {
  return {
    type: types.GET_TEAM_CHALLENGE_RANK_LIST_CLEAR,
  };
};
