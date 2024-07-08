import * as types from './actionTypes';

export const getTeamGroupBasedChallengeListByCollaborator = (
  collaboratorId,
  time,
  year,
  start,
  end,
  type,
) => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_LIST_BY_COLLABORATOR,
    collaboratorId,
    time,
    year,
    start,
    end,
    challengeType: type,
  };
};

export const getTeamGroupBasedChallengeListByTeam = (
  teamId,
  time,
  year,
  start,
  end,
  type,
) => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_LIST_BY_TEAM,
    teamId,
    time,
    year,
    start,
    end,
    challengeType: type,
  };
};

export const getTeamGroupBasedChallengeListByTeamGroup = (
  teamGroupId,
  time,
  year,
  start,
  end,
  type,
) => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_LIST_BY_TEAM_GROUP,
    teamGroupId,
    time,
    year,
    start,
    end,
    challengeType: type,
  };
};

export const getTeamGroupBasedChallengeListSuccess = (challenges) => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_LIST_SUCCESS,
    challenges,
  };
};

export const getTeamGroupBasedChallengeListError = () => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_LIST_ERROR,
  };
};

export const getTeamGroupBasedChallengeListClear = () => {
  return {
    type: types.GET_TEAM_GROUP_BASED_CHALLENGE_LIST_CLEAR,
  };
};
