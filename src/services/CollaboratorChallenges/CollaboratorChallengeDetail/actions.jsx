import * as types from './actionTypes';

export const getCollaboratorChallengeDetail = (id) => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_DETAIL,
    id,
  };
};

export const getCollaboratorChallengeDetailSuccess = (challenge) => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_DETAIL_SUCCESS,
    challenge,
  };
};

export const getCollaboratorChallengeDetailError = () => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_DETAIL_ERROR,
  };
};
