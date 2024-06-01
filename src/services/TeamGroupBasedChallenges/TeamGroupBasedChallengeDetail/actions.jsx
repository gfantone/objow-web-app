import * as types from './actionTypes';

export const getTeamGroupBasedChallengeDetail = (id) => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_DETAIL,
    id,
  };
};

export const getTeamGroupBasedChallengeDetailSuccess = (challenge) => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_DETAIL_SUCCESS,
    challenge,
  };
};

export const getTeamGroupBasedChallengeDetailError = () => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_DETAIL_ERROR,
  };
};
