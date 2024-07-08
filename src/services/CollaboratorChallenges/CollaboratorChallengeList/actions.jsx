import * as types from './actionTypes';

export const getCollaboratorChallengeList = (
  collaboratorId,
  time,
  year,
  start,
  end,
  type,
) => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_LIST,
    collaboratorId,
    year,
    time,
    start,
    end,
    challengeType: type,
  };
};

export const getCollaboratorChallengeListSuccess = (challenges) => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_LIST_SUCCESS,
    challenges,
  };
};

export const getCollaboratorChallengeListError = () => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_LIST_ERROR,
  };
};

export const getCollaboratorChallengeListClear = () => {
  return {
    type: types.GET_COLLABORATOR_CHALLENGE_LIST_CLEAR,
  };
};
