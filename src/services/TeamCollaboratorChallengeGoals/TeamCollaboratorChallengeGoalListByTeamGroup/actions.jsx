import * as types from './actionTypes';

export const getTeamCollaboratorChallengeGoalListByTeamGroup = (
  challengeId,
) => {
  return {
    type: types.GET_TEAM_COLLABORATOR_CHALLENGE_GOAL_LIST_BY_TEAM_GROUP,
    challengeId,
  };
};

export const getTeamCollaboratorChallengeGoalListByTeamGroupSuccess = (
  goals,
) => {
  return {
    type: types.GET_TEAM_COLLABORATOR_CHALLENGE_GOAL_LIST_BY_TEAM_GROUP_SUCCESS,
    goals,
  };
};

export const getTeamCollaboratorChallengeGoalListByTeamGroupError = () => {
  return {
    type: types.GET_TEAM_COLLABORATOR_CHALLENGE_GOAL_LIST_BY_TEAM_GROUP_ERROR,
  };
};
