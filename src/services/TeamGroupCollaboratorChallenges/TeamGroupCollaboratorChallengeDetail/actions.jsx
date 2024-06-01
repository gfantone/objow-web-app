import * as types from './actionTypes';

export const getTeamGroupCollaboratorChallengeDetail = (id) => {
  return {
    type: types.GET_TEAM_GROUP_COLLABORATOR_CHALLENGE_DETAIL,
    id,
  };
};

export const getTeamGroupCollaboratorChallengeDetailSuccess = (challenge) => {
  return {
    type: types.GET_TEAM_GROUP_COLLABORATOR_CHALLENGE_DETAIL_SUCCESS,
    challenge,
  };
};

export const getTeamGroupCollaboratorChallengeDetailError = () => {
  return {
    type: types.GET_TEAM_GROUP_COLLABORATOR_CHALLENGE_DETAIL_ERROR,
  };
};
