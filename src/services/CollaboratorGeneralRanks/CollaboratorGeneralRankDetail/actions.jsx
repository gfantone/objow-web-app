import * as types from './actionTypes';

export const getCollaboratorGeneralRankDetail = (collaboratorId, year) => {
  return {
    type: types.GET_COLLABORATOR_GENERAL_RANK_DETAIL,
    collaboratorId,
    year,
  };
};

export const getCollaboratorGeneralRankDetailSuccess = (rank) => {
  return {
    type: types.GET_COLLABORATOR_GENERAL_RANK_DETAIL_SUCCESS,
    rank,
  };
};

export const getCollaboratorGeneralRankDetailError = () => {
  return {
    type: types.GET_COLLABORATOR_GENERAL_RANK_DETAIL_ERROR,
  };
};
