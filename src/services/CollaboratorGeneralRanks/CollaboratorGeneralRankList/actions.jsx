import * as types from './actionTypes';

export const getCollaboratorGeneralRankList = (periodId) => {
  return {
    type: types.GET_COLLABORATOR_GENERAL_RANK_LIST,
    periodId,
  };
};

export const getCollaboratorGeneralRankListSuccess = (ranks) => {
  return {
    type: types.GET_COLLABORATOR_GENERAL_RANK_LIST_SUCCESS,
    ranks,
  };
};

export const getCollaboratorGeneralRankListError = () => {
  return {
    type: types.GET_COLLABORATOR_GENERAL_RANK_LIST_ERROR,
  };
};
