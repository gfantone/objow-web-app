import * as types from './actionTypes';

export const getTeamPersonalizedChallengeListByCollaborator = (
  collaboratorId,
  time,
  year,
  start,
  end,
  type,
) => {
  return {
    type: types.GET_TEAM_PERSONALIZED_CHALLENGE_LIST_BY_COLLABORATOR,
    collaboratorId,
    time,
    year,
    start,
    end,
    challengeType: type,
  }
}

export const getTeamPersonalizedChallengeListByTeam = (
  teamId,
  time,
  year,
  start,
  end,
  type,
) => {
  return {
    type: types.GET_TEAM_PERSONALIZED_CHALLENGE_LIST_BY_TEAM,
    teamId,
    time,
    year,
    start,
    end,
    challengeType: type,
  };
};

export const getTeamPersonalizedChallengeListByTeamGroup = (
  teamGroupId,
  time,
  year,
  start,
  end,
  type,
) => {
  return {
    type: types.GET_TEAM_PERSONALIZED_CHALLENGE_LIST_BY_TEAM_GROUP,
    teamGroupId,
    time,
    year,
    start,
    end,
    challengeType: type,
  };
};

export const getTeamPersonalizedChallengeListSuccess = (challenges) => {
  return {
    type: types.GET_TEAM_PERSONALIZED_CHALLENGE_LIST_SUCCESS,
    challenges,
  };
};

export const getTeamPersonalizedChallengeListError = () => {
  return {
    type: types.GET_TEAM_PERSONALIZED_CHALLENGE_LIST_ERROR,
  };
};

export const getTeamPersonalizedChallengeListClear = () => {
  return {
    type: types.GET_TEAM_PERSONALIZED_CHALLENGE_LIST_CLEAR,
  };
};
