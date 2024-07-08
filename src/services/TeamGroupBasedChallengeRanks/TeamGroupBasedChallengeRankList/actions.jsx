import * as types from './actionTypes';

export const getTeamGroupBasedChallengeRankList = (challengeId, page) => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_RANK_LIST,
    challengeId,
    page,
  };
};

export const getTeamGroupBasedChallengeRankListByTeamGroup = (
  challengeId,
  page,
) => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_RANK_LIST_BY_TEAM_GROUP,
    challengeId,
    page,
  };
};

export const getTeamGroupBasedChallengeRankListSuccess = (ranks) => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_RANK_LIST_SUCCESS,
    ranks,
  };
};

export const getTeamGroupBasedChallengeRankListError = () => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_RANK_LIST_ERROR,
  };
};
