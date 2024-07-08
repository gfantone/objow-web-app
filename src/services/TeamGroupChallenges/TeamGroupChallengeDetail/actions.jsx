import * as types from './actionTypes';

export const getTeamGroupChallengeDetail = (id) => {
  return {
    type: types.GET_TEAM_GROUP_CHALLENGE_DETAIL,
    id,
  };
};

export const getTeamGroupChallengeDetailSuccess = (challenge) => {
  return {
    type: types.GET_TEAM_GROUP_CHALLENGE_DETAIL_SUCCESS,
    challenge,
  };
};

export const getTeamGroupChallengeDetailError = () => {
  return {
    type: types.GET_TEAM_GROUP_CHALLENGE_DETAIL_ERROR,
  };
};
