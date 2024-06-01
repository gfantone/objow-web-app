import * as types from './actionTypes';

export const getTeamCollaboratorChallengeList = (
  teamId,
  time,
  year,
  start,
  end,
  type,
) => {
  return {
    type: types.GET_TEAM_COLLABORATOR_CHALLENGE_LIST,
    teamId,
    time,
    year,
    start,
    end,
    challengeType: type,
  };
};

export const getTeamCollaboratorChallengeListByTeamGroup = (
  teamGroupId,
  time,
  year,
  start,
  end,
  type,
) => {
  return {
    type: types.GET_TEAM_COLLABORATOR_CHALLENGE_LIST_BY_TEAM_GROUP,
    teamGroupId,
    time,
    year,
    start,
    end,
    challengeType: type,
  };
};

export const getTeamCollaboratorChallengeListSuccess = (challenges) => {
  return {
    type: types.GET_TEAM_COLLABORATOR_CHALLENGE_LIST_SUCCESS,
    challenges,
  };
};

export const getTeamCollaboratorChallengeListError = () => {
  return {
    type: types.GET_TEAM_COLLABORATOR_CHALLENGE_LIST_ERROR,
  };
};

export const getTeamCollaboratorChallengeListClear = () => {
  return {
    type: types.GET_TEAM_COLLABORATOR_CHALLENGE_LIST_CLEAR,
  };
};
