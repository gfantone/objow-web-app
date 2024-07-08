import * as types from './actionTypes';

export const getCollaboratorChallengeGeneralRankList = (periodId) => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_GENERAL_RANK_LIST,
    periodId,
  };
};

export const getCollaboratorChallengeGeneralRankListSuccess = (ranks) => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_GENERAL_RANK_LIST_SUCCESS,
    ranks,
  };
};

export const getCollaboratorChallengeGeneralRankListError = () => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_GENERAL_RANK_LIST_ERROR,
  };
};
