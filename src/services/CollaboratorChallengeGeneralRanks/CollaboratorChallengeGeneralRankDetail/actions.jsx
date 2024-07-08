import * as types from './actionTypes';

export const getCollaboratorChallengeGeneralRankDetail = (
  collaboratorId,
  year,
) => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_GENERAL_RANK_DETAIL,
    collaboratorId,
    year,
  };
};

export const getCollaboratorChallengeGeneralRankDetailSuccess = (rank) => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_GENERAL_RANK_DETAIL_SUCCESS,
    rank,
  };
};

export const getCollaboratorChallengeGeneralRankDetailError = () => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_GENERAL_RANK_DETAIL_ERROR,
  };
};
